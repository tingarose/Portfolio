export const pastryPalette: Record<string, string> = {
  o: '#875236', g: '#dda05d', y: '#f6ce87', w: '#fff2d9',
  p: '#ed9db5', r: '#bd536e', c: '#583c35', b: '#7382b3',
  v: '#b2c788', s: '#d5a4d4',
};

// Complete silhouettes on transparent pixel grids. Dimensions also drive hitboxes.
export const pastries = [
  { name: 'Strawberry donut', pixels: [
    '    oooo    ', '  ooppppoo  ', ' oppwpppppo ', ' opprppwppo ',
    'oppwoooopppo', 'oppo    oppo', 'oppo    oppo', 'opppooooppro',
    ' opppppwppo ', ' ogppppppgo ', '  ooggggoo  ', '    oooo    ',
  ] },
  { name: 'Strawberry cupcake', pixels: [
    '     rr     ', '    pwwp    ', '   ppwwpp   ', '  pppppwpp  ',
    ' ppwppppppp ', 'pppppppppppp', 'rrrrrrrrrrrr', ' oggggggggo ',
    ' ogyggygggo ', '  oyggyggo  ', '  ogyggygo  ', '   oooooo   ',
  ] },
  { name: 'Croissant', pixels: [
    '    oooo    ', '   ogyygo   ', '  ogoyyogo  ', ' ogyoyyoygo ',
    'ogyogyyogygo', 'ogyogggogygo', 'oygoooooogyo',
    'oygo    ogyo', ' ogo    ogo ', '  oo    oo  ',
  ] },
  { name: 'Chocolate eclair', pixels: [
    '  oooooooo  ', ' occcccccco ', 'ccwwccccwccc', 'cccccccccccc',
    'oggggggggggo', 'oyyyyyyyyyyo', 'owwwwwwwwwwo', 'oggggggggggo', ' oooooooooo ',
  ] },
  { name: 'Matcha macaron', pixels: [
    '   oooooo   ', '  ovvvvvvo  ', ' ovwwvvvvvo ', 'ovvvvvvvvvvo',
    'ovvvvvvvvvvo', ' oooooooooo ', 'owwwwwwwwwwo', ' oooooooooo ',
    'ovvvvvvvvvvo', ' ovvvvvvvvo ', '  oooooooo  ',
  ] },
  { name: 'Blueberry muffin', pixels: [
    '    oooo    ', '  ooggygoo  ', ' oggbggy go ',
    ' oggyggbbgo ', 'ogbbggyggggo', 'oggygggbgggo', 'oooooooooooo',
    ' ogyggygggo ', ' ogyggygggo ', '  oyggyggo  ', '  ogyggygo  ', '   oooooo   ',
  ] },
  { name: 'Cherry tart', pixels: [
    '    rr rr   ', '   rrr rrr  ', '  owwwwwwo  ',
    ' owwwwwwwwo ',
    'oywwwwwwwwyo', 'oyyyyyyyyyyo', 'ogogogogoggo', ' oggggggggo ', '  oooooooo  ',
  ] },
  { name: 'Lavender cake', pixels: [
    '      rr    ', '     www    ', '    wwwww   ', '   wwwwwww  ',
    '  sssssssss ', ' ossssssssso', ' ogyyyyyyygo', ' ossssssssso',
    ' ogyyyyyyygo', ' ossssssssso', ' ooooooooooo',
  ] },
];

