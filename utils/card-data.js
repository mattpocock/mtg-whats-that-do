export const getImageUrl = (card, faceIndex = 0) => {
  if (!card) return '';

  if (card.card_faces) {
    return card.card_faces[faceIndex].image_uris.border_crop;
  }

  return card.image_uris.border_crop;
};

export const isDoubleFaced = card => !!card && !!card.card_faces;

/**
 * Extract oracle data from the card. There may be two items if the card is
 * double faced.
 *
 * @param {Object} card   Card object.
 *
 * @return {Object[]|null} Array of oracle info.
 */
export const getOracleData = card => {
  if (!card) return null;

  const mapper = face => ({
    color_identity: face.color_identity,
    mana_cost: face.mana_cost,
    name: face.name,
    oracle_text: face.oracle_text,
    power: face.power,
    toughness: face.toughness,
    type_line: face.type_line,
    flavor_text: face.flavor_text,
    loyalty: face.loyalty,
  });

  return isDoubleFaced(card) ? card.card_faces.map(mapper) : [mapper(card)];
};
