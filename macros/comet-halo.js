const selectedTokens = canvas.tokens.controlled;
const effectScale = 0.13;

const randomXValue = Math.floor(Math.random() * 70) - 25;
const randomYValue = Math.floor(Math.random() * 15);

for (let selectedToken of selectedTokens) {
  const tokenSize = (selectedToken.data.width + selectedToken.data.height) / 2;

  const x = new Sequence()
    .effect()
    .attachTo(selectedToken)
    .file(`jb2a.dancing_light.purplegreen`)
    .belowTokens()
    .scale(effectScale * tokenSize)
    .persist()
    .name('Comet')
    .effect()
    .attachTo(selectedToken, {
      offset: {
        x: randomXValue,
        y: -(selectedToken.data.height * 20) - randomYValue,
      },
    })
    .file(`jb2a.dancing_light.purplegreen`)
    .filter('Glow', {
      distance: 20,
      outerStrength: 1,
      innerStrength: 0,
      color: 0xaa33f0,
      quality: 0.2,
      knockout: false,
    })
    .scale(effectScale * tokenSize)

    .opacity(0.5)
    .rotateIn(-90, 1500, { ease: 'easeOutCubic' })

    .persist()
    .name('Comet')
    .play();

  x.moveTowards({ x: -1 * randomXValue, y: -1 * randomYValue }).moveSpeed(500);
}
