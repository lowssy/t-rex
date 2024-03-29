const GRAVITY = -1.9

class TRex {
  constructor(initialY, dx, img) {
    this.distance = 0
    this.x = 0
    this.y = initialY
    this.bottom = initialY
    this.dy = 2.6
    this.dx = dx
    this.dt = 0.5

    this.width = 44
    this.height = 47
    this.wichDinosaur = 0 // This is to see in what part of the animation are we
    this.frameCounter = 0 // Double jump

    this.isJumping = false // Activates the jump() function
    this.doubleJump = false // This is to double jump

    this.jumpSound = new Audio('./res/jump.wav')
    this.dieSound = new Audio('./res/game-over.wav')

    this.img = img
  }

  update(ctx) {
    if(this.isJumping === true) {
      this.jumping()
    }

    this.distance = (this.distance + this.dx)
    this.draw(ctx)
  }

  jumping() {
    if(this.y - 6 >= this.bottom) { // Is on the bottom?
      this.isJumping = false
      this.y = this.bottom
      this.dt = 0.5
      this.dy = 2.6
      this.doubleJump = false
    } else if(this.doubleJump) {
      this.dt += 0.0045
    }

    this.y = this.y + (this.dy * this.dt)
    this.dy = this.dy + (GRAVITY * this.dt)

    if(this.dt - 0.011 <= 0) {
      this.dt -= 0.025
    } else {
      this.dt -= 0.012
    }
  }

  draw(ctx) {
    let sprite

    if(this.isJumping && this.wichDinosaur != 4) { // Make sure that the dinosaur could die even while jumping
      sprite = 677
    } else {
      sprite = 677 + (this.wichDinosaur * this.width)
    }

    ctx.drawImage(
      this.img,
      sprite,
      2,
      this.width,
      this.height,
      0,
      this.y,
      this.width,
      this.height
    )

    if(this.frameCounter == 4) {
      this.frameCounter = 0

      if(this.wichDinosaur == 3) {
        this.wichDinosaur = 0
      } else {
        this.wichDinosaur++
      }
    } else {
      this.frameCounter++
    }
  }

  getImage() {
    return this.img
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  move(e) {
    if(e.code ==  'ArrowUp' || e.code == 'Space') { //Jump on ArrowUp or Space, avoid traps
      if(this.isJumping && !this.doubleJump) {
        this.doubleJump = true
      }

      this.isJumping = true
      this.jumpSound.play()
    } else if(e.code == 'ArrowDown') { // Dropdown on ArrowDown
      if(this.isJumping) {
        this.dy -= 4
      }
    }
  }

  didCollide(cx, cy) {
    let collideX = cx < this.x + this.width && cx > this.x
    let collideY = this.y + this.width > cy

    return collideX && collideY
  }

  die(ctx) {
    this.dieSound.play()
    this.wichDinosaur = 4 // Die sprite
    this.draw(ctx)
  }
}

export default TRex