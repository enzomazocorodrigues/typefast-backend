
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games_phrases').del()
    .then(function () {
      // Inserts seed entries
      return knex('games_phrases').insert([
        {
          idPai: "23ced3d5-b550-41e5-afe1-56ad9537c448",
          texto: "O rato roeu a roupa do rei de Roma",
        },
        {
          idPai: "23ced3d5-b550-41e5-afe1-56ad9537c448",
          texto: "Três tigres tristes comeram três pratos de trigo",
        },
        {
          idPai: "23ced3d5-b550-41e5-afe1-56ad9537c448",
          texto: "Sabendo o que sei e sabendo o que sabes e o que não sabes e o que não sabemos, ambos saberemos se somos sábios, sabidos ou simplesmente saberemos se somos sabedores.",
        },
      ]);
    });
};
