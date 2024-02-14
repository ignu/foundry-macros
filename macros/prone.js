const TAG = 'Prone';
const ROTATION_ANGLE = -129;
const Y_OFFSET = 9;

if (canvas.tokens.controlled.length === 0) {
  ui.notifications.warn('Please select a token.');
} else {
  let selectedToken = canvas.tokens.controlled[0];

  let newRotation = selectedToken.data.rotation;
  let position = selectedToken.data.y;
  const isProne = Tagger.hasTags(token, TAG);
  let effect =
    CONFIG.statusEffects.find((e) => e.label === 'Prone') ??
    'modules/dfreds-convenient-effects/images/prone.svg';
  if (!isProne) {
    await Tagger.addTags(token, TAG);
    newRotation += ROTATION_ANGLE;
    position += Y_OFFSET;
    selectedToken.toggleEffect(effect, { active: true });
  } else {
    await Tagger.removeTags(token, TAG);
    newRotation -= ROTATION_ANGLE;
    position -= Y_OFFSET;
    selectedToken.toggleEffect(effect, { active: false });
  }

  selectedToken.document.update({ rotation: newRotation, y: position });
}
