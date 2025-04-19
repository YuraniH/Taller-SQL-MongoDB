// Taller: MongoDB con JSON de Pokémon
// 📚 Por: Yurani Hurtado Lozano

🔹Parte 1: Consultas Básicas 
1. 🕵️‍♂️Encuentra todos los Pokémon de tipo “Electric”. 
db.pokemones.find({ Type1: "Electric" })

2. 📊Muestra solo los nombres y el ataque de los Pokémon con más de 100 de ataque. 
db.pokemones.find(
  { Attack: { $gt: 100 } },
  { _id: 0, Name: 1, Attack: 1 }
)

3. 🧱Encuentra los Pokémon cuya defensa esté entre 80 y 100.
db.pokemones.find(
  { Defense: { $gte: 80, $lte: 100 } }
)

🔹Parte 2: Agregaciones 
4. 📈Muestra el promedio de ataque de los Pokémon por tipo (Type1). 
db.pokemones.aggregate([
  {
    $group: {
      _id: "$Type1",
      promedioAtaque: { $avg: "$Attack" }
    }
  }
])

5.🔝Encuentra el Pokémon con más HP de cada tipo. 
db.pokemones.aggregate([
  {
    $sort: { Type1: 1, Type2: 1, HP: -1 }  // Ordena por ambos tipos y luego HP
  },
  {
    $group: {
      _id: { type1: "$Type1", type2: "$Type2" },
      nombre: { $first: "$Name" },
      HP: { $first: "$HP" }
    }
  }
])

6. 🚀Muestra los 5 Pokémon más rápidos
db.pokemones.find()
  .sort({ Speed: -1 })  // Orden descendente
  .limit(5)

🔹Parte 3: Combinaciones de $match, $group y $sort 
7. 🌊Muestra el promedio de ataque de los Pokémon tipo “Water” ordenado de mayor a menor. 
db.pokemones.aggregate([
  {
    $match: { Type1: "Water" }
  },
  {
    $group: {
      _id: "$Type1",
      promedioAtaque: { $avg: "$Attack" }
    }
  },
  {
    $sort: { promedioAtaque: -1 }
  }
])
-------- Type2
db.pokemones.aggregate([
  {
    $match: { Type2: "Water" }
  },
  {
    $group: {
      _id: "$Type2",
      promedioAtaque: { $avg: "$Attack" }
    }
  },
  {
    $sort: { promedioAtaque: -1 }
  }
])

8.🧬Encuentra el Pokémon con más ataque por generación y ordénalos de mayor a menor.
db.pokemones.aggregate([
  {
    $sort: { Generation: 1, Attack: -1 }
  },
  {
    $group: {
      _id: "$Generation",
      nombre: { $first: "$Name" },
      ataque: { $first: "$Attack" }
    }
  },
  {
    $sort: { ataque: -1 }
  }
])


Parte 4: Indexación y Rendimiento 
9. ⚙️Crea un índice en el campo Type1. 
db.pokemones.createIndex({ Type1: 1 })

10. 📊Usa explain() para analizar el rendimiento de una búsqueda.
db.pokemones.find({ Type1: "Fire" }).explain("executionStats")

11.🧩Crea un índice compuesto en Type1 y Speed, y analiza una búsqueda.
db.pokemones.createIndex({ Type1: 1, Speed: -1 })
db.pokemones.find({ Type1: "Electric" }).sort({ Speed: -1 }).explain("executionStats")
