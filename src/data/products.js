// Datos estáticos de productos
// Basado en el seed de carrito-pedidos con productos adicionales

export const productos = [
  {
    id: 1,
    nombre: "Hamburguesa Clasica",
    precio: 250,
    tiempoPreparacion: 20,
    categoriaId: 2,
    categoria: {
      id: 2,
      nombre: "🍔 Hamburguesas"
    },
    imagenes: [
      { url: "https://tse4.mm.bing.net/th/id/OIP.AFRA_nbM376BJXLem2J7LgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" }
    ]
  },
  {
    id: 2,
    nombre: "Combo Hamburguesa con fritas",
    precio: 380,
    tiempoPreparacion: 25,
    categoriaId: 2,
    categoria: {
      id: 2,
      nombre: "🍔 Hamburguesas"
    },
    imagenes: [
      { url: "https://d2yoo3qu6vrk5d.cloudfront.net/images/20221024144855/cropped-festival-de-hamburguesas-en-bogota-cali-y-mas-cuando-es-y-precios-de-la-comida-27.jpg" }
    ]
  },
  {
    id: 3,
    nombre: "Pizza con muzarella",
    precio: 350,
    tiempoPreparacion: 20,
    categoriaId: 1,
    categoria: {
      id: 1,
      nombre: "🍕 Pizzas"
    },
    imagenes: [
      { url: "https://th.bing.com/th/id/R.58ba742b3eb91f8cac1be32df5e1b260?rik=aDdl01HuERMWKw&riu=http%3a%2f%2fimg1.wsimg.com%2fisteam%2fip%2fbd91ca79-9d77-4d2d-96f6-64baea96feda%2f2.jpg&ehk=ITTVLJfOvi7AzmOb9y2uO%2bCWsRzLbEufDtNIfi%2fB2mw%3d&risl=&pid=ImgRaw&r=0" }
    ]
  },
  {
    id: 4,
    nombre: "Hamburguesa con cheddar",
    precio: 300,
    tiempoPreparacion: 22,
    categoriaId: 2,
    categoria: {
      id: 2,
      nombre: "🍔 Hamburguesas"
    },
    imagenes: [
      { url: "https://tse4.mm.bing.net/th/id/OIP.w8kgMmCI33o-NKx5SNucjQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" }
    ]
  },
  {
    id: 5,
    nombre: "Porcion de fritas",
    precio: 300,
    tiempoPreparacion: 15,
    categoriaId: 2,
    categoria: {
      id: 2,
      nombre: "🍔 Hamburguesas"
    },
    imagenes: [
      { url: "https://tse4.mm.bing.net/th/id/OIP.i0nool-jIXuK7g8JY_zeWgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" }
    ]
  },
  {
    id: 6,
    nombre: "Promo 2 hamburguesas clasicas",
    precio: 390,
    tiempoPreparacion: 25,
    categoriaId: 2,
    categoria: {
      id: 2,
      nombre: "🍔 Hamburguesas"
    },
    imagenes: [
      { url: "https://img.freepik.com/fotos-premium/hamburguesa-aislado-sobre-fondo-negro_766625-10166.jpg" }
    ]
  }
];

export default productos;

