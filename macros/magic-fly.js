var token;
if (Array.from(game.user.targets).length >= 1) {
  token = Array.from(game.user.targets)[0];
} else {
  token = canvas.tokens.controlled[0];
}

if (Tagger.hasTags(token, 'MagicFlying')) {
  await Tagger.removeTags(token, 'MagicFlying');
  await Sequencer.EffectManager.endEffects({ name: 'Fly', object: token });

  new Sequence()

    .animation()
    .on(token)
    .opacity(1)

    .play();
} else {
  await Tagger.addTags(token, 'MagicFlying');

  await new Sequence()

    .effect()
    .atLocation(token)
    .file(`jb2a.magic_signs.circle.02.conjuration.loop.yellow`)
    .scaleToObject(1.25)
    .rotateIn(180, 600, { ease: 'easeOutCubic' })
    .scaleIn(0, 600, { ease: 'easeOutCubic' })
    .loopProperty('sprite', 'rotation', { from: 0, to: -360, duration: 10000 })
    .belowTokens()
    .fadeOut(400)
    .duration(1400)

    .effect()
    .atLocation(token)
    .file(`jb2a.magic_signs.circle.02.conjuration.loop.yellow`)
    .scaleToObject(1.25)
    .rotateIn(180, 600, { ease: 'easeOutCubic' })
    .scaleIn(0, 600, { ease: 'easeOutCubic' })
    .loopProperty('sprite', 'rotation', { from: 0, to: -360, duration: 10000 })
    .belowTokens(true)
    .filter('ColorMatrix', { saturate: -1, brightness: 2 })
    .filter('Blur', { blurX: 5, blurY: 10 })
    .zIndex(1)
    .duration(1200)
    .fadeIn(200, { ease: 'easeOutCirc', delay: 500 })
    .fadeOut(300, { ease: 'linear' })
    .waitUntilFinished()

    .effect()
    .file('animated-spell-effects-cartoon.energy.pulse.yellow')
    .atLocation(token, { offset: { y: 0.2 }, gridUnits: true })
    .size(
      {
        width: token.document.width * 1.5,
        height: token.document.width * 1.45,
      },
      { gridUnits: true },
    )
    .belowTokens()
    .filter('ColorMatrix', { hue: -10 })
    .zIndex(1)

    .effect()
    .file('animated-spell-effects-cartoon.smoke.105')
    .atLocation(token, { offset: { y: 0.05 }, gridUnits: true })
    .opacity(1)
    .scaleToObject(2)
    .tint('#FFd129')
    .belowTokens()

    .animation()
    .on(token)
    .opacity(0)

    .effect()
    .from(token)
    .name('Fly')
    .attachTo(token, { bindAlpha: false, followRotation: true, locale: false })
    .scaleToObject(1, { considerTokenScale: true })
    .opacity(1)
    .duration(800)
    .anchor({ x: token.document.texture.scaleX * 0.55, y: 0.9 })
    .animateProperty('sprite', 'position.y', {
      from: 50,
      to: -10,
      duration: 500,
      ease: 'easeOutBack',
    })
    .loopProperty('sprite', 'position.y', {
      from: 0,
      to: -50,
      duration: 2500,
      pingPong: true,
      delay: 1000,
    })
    .filter('Glow', {
      color: 0xffd129,
      distance: 10,
      outerStrength: 4,
      innerStrength: 0,
    })
    .zIndex(2)
    .persist()

    .effect()
    .file('jb2a.particles.outward.orange.02.04')
    .name('Fly')
    .scaleToObject(1.35, { considerTokenScale: true })
    .attachTo(token, { bindAlpha: false })
    .opacity(1)
    .duration(800)
    .anchor({ x: token.document.texture.scaleX * 0.55, y: 0.8 })
    .animateProperty('sprite', 'position.y', {
      from: 50,
      to: -10,
      duration: 500,
      ease: 'easeOutBack',
    })
    .loopProperty('sprite', 'position.y', {
      from: 0,
      to: -50,
      duration: 2500,
      pingPong: true,
      delay: 1000,
    })
    .fadeIn(1000)
    .zIndex(2.2)
    .persist()

    .effect()
    .from(token)
    .name('Fly')
    .atLocation(token)
    .scaleToObject(0.9)
    .duration(1000)
    .opacity(0.5)
    .belowTokens()
    .filter('ColorMatrix', { brightness: -1 })
    .filter('Blur', { blurX: 5, blurY: 10 })
    .attachTo(token, { bindAlpha: false })
    .zIndex(1)
    .persist()

    .play();

  while (Tagger.hasTags(token, 'MagicFlying')) {
    await new Sequence()

      .effect()
      .delay(100)
      .file('jb2a.particles.outward.orange.02.03')
      .atLocation(token)
      .scaleToObject(1.2)
      .opacity(1)
      .duration(500)
      .anchor({ x: 0.55, y: 0.7 })
      .loopProperty('spriteContainer', 'position.y', {
        from: 0,
        to: -50,
        duration: 2500,
        pingPong: true,
        delay: 500,
      })
      .animateProperty('spriteContainer', 'position.y', {
        from: 0,
        to: 0.5,
        gridUnits: true,
        duration: 500,
      })
      .fadeOut(350)
      .spriteRotation(Math.random() * (360 - 0) + 0)
      .zIndex(1)

      .play();
  }
}
