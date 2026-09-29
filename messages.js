/**
 * Liste des messages, écrite en dur (aucun lien avec Firebase).
 * Pour ajouter, retirer ou corriger un message : modifie ce tableau, puis
 * recharge la page. kind: 'fille' ou 'gars'.
 */
const MESSAGES = [
  { text: 'macuch', kind: 'fille' },
  { text: 'Eli', kind: 'fille' },
  { text: 'Maria', kind: 'fille' },
  { text: 'Elle est belle 🤩 elle a des lunettes 👓 elle êtr', kind: 'fille' },
  { text: 'Et aussi Isaac', kind: 'gars' },
  { text: 'Personne 😭', kind: 'gars' },
  { text: 'Anoushka', kind: 'fille' },
  { text: 'Je veut pas etres anonyme', kind: 'fille' },
  { text: 'Alicia sec 3', kind: 'fille' }, // corrigé : "gars" à l'origine, mais Alicia est un prénom féminin
  { text: 'Maryeli', kind: 'fille' },
  { text: 'Momoa', kind: 'gars' },
  { text: 'Ted Emanuel', kind: 'gars' },
  { text: 'Hussein 4 seconder 👅🫃🏻👩🏻‍🍼', kind: 'gars' },
  { text: 'Jaime houssine', kind: 'gars' },
  { text: 'Il est trop beau et nonchalant... Nadir sec 3', kind: 'gars' },
  { text: 'mellie menard', kind: 'fille' },
  { text: 'Cristiano sec 4', kind: 'gars' },
  { text: 'C trop un paiinnn!! ... Mariely sec2', kind: 'fille' },
  { text: 'Luna', kind: 'fille' },
  { text: 'Marianne secondaire 5', kind: 'fille' },
  { text: 'Julian', kind: 'gars' },
  { text: 'Richecal secondaire 3', kind: 'gars' }, // incertain : prénom peu courant, dis-moi si c'est une fille
];

/**
 * Commentaires optionnels, un par personne (clé = kind + '|' + nom en
 * minuscules). Exemple : 'fille|maria': 'Commentaire ici'.
 */
const COMMENTS = {};
