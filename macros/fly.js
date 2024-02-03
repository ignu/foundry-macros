var token;
if (Array.from(game.user.targets).length >= 1) {
  token = Array.from(game.user.targets)[0];
} else {
  token = canvas.tokens.controlled[0];
}

if (Tagger.hasTags(token, 'MagicFlying')) {
  await Tagger.removeTags(token, 'MagicFlying');
  await Sequencer.EffectManager.endEffects({ name: 'Fly', object: token });

  new Sequence().animation().on(token).opacity(1).play();
} else {
  await Tagger.addTags(token, 'MagicFlying');

  // random number between 0 and 5
  const randomHeightModifier = Math.floor(Math.random() * 6);

  // random number between -3 and 1
  const randomLeftModifier = Math.floor(Math.random() * 5) - 3;

  const randomRightModifier = Math.floor(Math.random() * 5) + 1;

  const randomSpeed = Math.floor(Math.random() * 4500) + 2400;

  await new Sequence()
    .effect()
    .from(token)
    .name('Fly')
    .attachTo(token, { bindAlpha: false, followRotation: true, locale: false })
    .scaleToObject(1, { considerTokenScale: true })
    .opacity(1)
    .duration(800)
    .anchor({ x: token.document.texture.scaleX * 0.55, y: 0.9 })
    .animateProperty('sprite', 'position.y', {
      from: randomHeightModifier,
      to: -3,
      duration: 1200,
      ease: 'easeOutBack',
    })
    .loopProperty('sprite', 'position.y', {
      from: 0,
      to: -10 - randomHeightModifier,
      duration: 2500,
      pingPong: true,
      delay: 1000,
    })
    .loopProperty('sprite', 'position.x', {
      from: randomLeftModifier,
      to: randomRightModifier,
      duration: randomSpeed,
      pingPong: true,
      delay: 1000,
    })
    .zIndex(2)
    .persist()

    .animation()
    .on(token)
    .opacity(0)

    // shadow
    .effect()
    .from(token)
    .name('Fly')
    .atLocation(token)
    .scaleToObject(0.5)
    .duration(1000)
    .opacity(0.6)
    .belowTokens()
    .filter('ColorMatrix', { brightness: -1 })
    .filter('Blur', { blurX: 7, blurY: 10 })
    .attachTo(token, { bindAlpha: false })
    .zIndex(1)
    .persist()

    .play();
}
