DROP TABLE IF EXISTS Productos_Categorias;
DROP TABLE IF EXISTS Productos;
DROP TABLE IF EXISTS Categorias;

USE tallersql;

CREATE TABLE Categorias (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100)
);

CREATE TABLE Productos (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Precio DECIMAL(10, 2)
);

CREATE TABLE Productos_Categorias (
    ProductoID INT,
    CategoriaID INT,
    PRIMARY KEY (ProductoID, CategoriaID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ID),
    FOREIGN KEY (CategoriaID) REFERENCES Categorias(ID)
);

INSERT INTO Categorias (ID, Nombre) VALUES
(1, 'Bebidas'),
(2, 'Dulces');

INSERT INTO Productos (ID, Nombre, Precio) VALUES
(1, 'Jugo de Naranja', 2000),
(2, 'Chocolate', 800),
(3, 'Galletas', 1200);

INSERT INTO Productos_Categorias (ProductoID, CategoriaID) VALUES
(1, 1), -- Jugo de Naranja -> Bebidas
(2, 2), -- Chocolate -> Dulces
(3, 2); -- Galletas -> Dulces

-- ¿Cuáles son todos los productos disponibles y sus precios? 
SELECT Nombre, Precio
FROM Productos;

-- ¿Qué productos cuestan más de $1000? 
SELECT Nombre, Precio
FROM Productos
WHERE Precio > 1000;

-- ¿Qué productos pertenecen a cada categoria? 
SELECT p.Nombre AS Producto, c.Nombre AS Categoria
FROM Productos p
JOIN Productos_Categorias pc ON p.ID = pc.ProductoID
JOIN Categorias c ON c.ID = pc.CategoriaID;

-- Muestra todas las categorias, incluso si no tienen productos asignados.
SELECT c.Nombre AS Categoria, p.Nombre AS Producto
FROM Categorias c
LEFT JOIN Productos_Categorias pc ON c.ID = pc.CategoriaID
LEFT JOIN Productos p ON p.ID = pc.ProductoID;