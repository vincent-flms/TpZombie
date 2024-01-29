class Personne {
    constructor(nom, age, infecte, variant, vaccin) {
      this.nom = nom;
      this.age = age;
      this.infecte = infecte;
      this.contacts = [];
      this.variant = variant;
      this.vaccin = vaccin;
    }
  
    // Méthode pour ajouter un contact à la liste
    ajouterContact(personne) {
      this.contacts.push(personne);
      personne.contacts.push(this); // Ajouter la personne actuelle aux contacts de l'autre personne
    }
  }
  
  // Fonction maybe pour gérer les valeurs possiblement nulles
  const maybe = (value, func) => (value !== null && value !== undefined) ? func(value) : null;
  
  // Fonction d'ordre supérieur pour traiter le vaccin
  const traiterAvecVaccin = (personne, traitement) =>
    maybe(personne.vaccin, vaccin => traitement(personne, vaccin));
  
  // Traitement en fonction du type de vaccin
  const traitementVaccin = (personne, vaccin) => {
    switch (vaccin) {
      case 'Vaccin-A.1':
        // Vaccin-A.1 : Soigne les personnes de 0 à 30 ans et les immunise contre tous les variants
        if (personne.age >= 0 && personne.age <= 30) {
          personne.infecte = false;
        }
        break;
  
      case 'Vaccin-B.1':
        // Vaccin-B.1 : Tue une personne sur 2, soigne les autres sans les immuniser
        for (let i = 0; i < personne.contacts.length; i += 2) {
          if (personne.contacts[i]) {
            personne.contacts[i].infecte = false;
          }
        }
        break;
  
      case 'Vaccin-Ultime':
        // Vaccin-Ultime : Immunise la personne contre toutes les infections
        personne.infecte = false;
        break;
  
      default:
        // Aucun vaccin spécifié, pas de traitement spécial
    }
  };
  
  // Exemple d'utilisation
  const personne1 = new Personne('Alice', 25, true, 'Zombie-A', 'Vaccin-A.1');
  const personne2 = new Personne('Bob', 30, false, 'Zombie-B', 'Vaccin-B.1');
  const personne3 = new Personne('Charlie', 22, true, 'Zombie-32', 'Vaccin-A.1');
  
  // Ajouter des contacts pour personne1
  personne1.ajouterContact(personne2);
  personne1.ajouterContact(personne3);
  
  const personne4 = new Personne('David', 35, false, 'Zombie-C', 'Vaccin-B.1');
  const personne5 = new Personne('Eve', 28, false, 'Zombie-Ultime', 'Vaccin-Ultime');
  
  // Ajouter des contacts pour personne2 et personne3
  personne2.ajouterContact(personne1);
  personne2.ajouterContact(personne4);
  personne3.ajouterContact(personne1);
  personne3.ajouterContact(personne5);
  
  // Traitement avec le vaccin en utilisant la fonction d'ordre supérieur
  traiterAvecVaccin(personne1, traitementVaccin);
  traiterAvecVaccin(personne2, traitementVaccin);
  traiterAvecVaccin(personne3, traitementVaccin);
  traiterAvecVaccin(personne4, traitementVaccin);
  traiterAvecVaccin(personne5, traitementVaccin);
  
  // Affichage du statut après le traitement avec le vaccin
  console.log('Statut après traitement avec le vaccin :');
  console.log(`${personne1.nom}: ${personne1.infecte ? 'Infecté' : 'Non infecté'}`);
  console.log(`${personne2.nom}: ${personne2.infecte ? 'Infecté' : 'Non infecté'}`);
  console.log(`${personne3.nom}: ${personne3.infecte ? 'Infecté' : 'Non infecté'}`);
  console.log(`${personne4.nom}: ${personne4.infecte ? 'Infecté' : 'Non infecté'}`);
  console.log(`${personne5.nom}: ${personne5.infecte ? 'Infecté' : 'Non infecté'}`);