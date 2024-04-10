import {
  FontAwesome5,
  FontAwesome6,
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
export const categoryData = [
  {
    _id: 1,
    name: "Mobile",
    path: "mobile",
    icon: <Entypo name="mobile" size={24} color="black" />,
  },
  {
    _id: 2,
    name: "Desktop",
    path: "desktop",
    icon: <FontAwesome5 name="desktop" size={24} color="black" />,
  },
  {
    _id: 3,
    name: "T-Shirt",
    path: "tshirt",
    icon: <FontAwesome5 name="tshirt" size={24} color="black" />,
  },
  {
    _id: 4,
    name: "Tablets",
    path: "tablets",
    icon: (
      <MaterialCommunityIcons name="tablet-cellphone" size={24} color="black" />
    ),
  },
  {
    _id: 5,
    name: "Shoes",
    path: "shoe",
    icon: (
      <MaterialCommunityIcons name="shoe-sneaker" size={24} color="black" />
    ),
  },
  {
    _id: 6,
    name: "Guitar",
    path: "guitar",
    icon: <FontAwesome6 name="guitar" size={24} color="black" />,
  },
  {
    _id: 7,
    name: "HeadSet",
    path: "headset",
    icon: <Ionicons name="headset" size={24} color="black" />,
  },
];

export const Carousolimage = [
  {
    _id: 1,
    url: "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    txt: "New1",
  },
  {
    _id: 2,
    url: "https://images.unsplash.com/photo-1614160859544-177611d11f6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
    txt: "New2",
  },
  {
    _id: 3,
    url: "https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg",
    txt: "New3",
  },
  {
    _id: 4,
    url: "https://i.pinimg.com/736x/0a/d6/59/0ad6598f816b2db50994c939ae8b42a5.jpg",
    txt: "New4",
  },
];

export const productsList = [
  {
    _id: 1,
    name: "Apple iPhone 14 (128 GB) - Blue",
    category: "mobile",
    description:
      "15.40 cm (6.1-inch) Super Retina XDR display,Advanced camera system for better photos in any light, Vital safety technology — Crash Detection calls for help when you can’t",
    price: 61800,
    stock: 20,
    images: [
      "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51Sn5X2gfaL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/711JE+dD1KL._SL1500_.jpg",
    ],
    rating: 4.7,
    offer: 30,
  },
  {
    _id: 2,
    name: "Apple iPhone 14 (128 GB) - Blue",
    category: "mobile",
    description:
      "15.40 cm (6.1-inch) Super Retina XDR display,Advanced camera system for better photos in any light, Vital safety technology — Crash Detection calls for help when you can’t",
    price: 61800,
    stock: 20,
    images: [
      "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51Sn5X2gfaL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/711JE+dD1KL._SL1500_.jpg",
    ],
    rating: 4.7,
    offer: 30,
  },
  {
    _id: 3,
    name: "Apple iPhone 14 (128 GB) - Blue",
    category: "mobile",
    description:
      "15.40 cm (6.1-inch) Super Retina XDR display,Advanced camera system for better photos in any light, Vital safety technology — Crash Detection calls for help when you can’t",
    price: 61800,
    stock: 20,
    images: [
      "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/51Sn5X2gfaL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/711JE+dD1KL._SL1500_.jpg",
    ],
    rating: 4.7,
    offer: 30,
  },
];

export const cartData = [
  {
    product: {
      _id: 1,
      name: "Apple iPhone 14 (128 GB) - Blue",
      category: "mobile",
      description:
        "15.40 cm (6.1-inch) Super Retina XDR display,Advanced camera system for better photos in any light, Vital safety technology — Crash Detection calls for help when you can’t",
      price: 61800,
      stock: 20,
      images: [
        "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51Sn5X2gfaL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/711JE+dD1KL._SL1500_.jpg",
      ],
      rating: 4.7,
      offer: 30,
    },
    quantity: 2,
  },
  {
    product: {
      _id: 2,
      name: "Apple iPhone 14 (128 GB) - Blue",
      category: "mobile",
      description:
        "15.40 cm (6.1-inch) Super Retina XDR display,Advanced camera system for better photos in any light, Vital safety technology — Crash Detection calls for help when you can’t",
      price: 61800,
      stock: 20,
      images: [
        "https://m.media-amazon.com/images/I/61bK6PMOC3L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51Sn5X2gfaL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/711JE+dD1KL._SL1500_.jpg",
      ],
      rating: 4.7,
      offer: 30,
    },
    quantity: 1,
  },
];

export const addressData = [
  {
    _id: "JGF$#jhGF%$hmfhg",
    name: "xyz 1 nmae",
    state: "uttar pradesh",
    city: "Kattar",
    street: "Kasibose street",
    landmark: "pushpa ghat",
    pincode: 458793,
  },
  {
    _id: "HJF^%#$563FD576",
    name: "xyz 2 name",
    state: "Nepal",
    city: "kosin",
    street: "Mahamad ali park",
    landmark: "bosir market",
    pincode: 753951,
  },
];

export const userData = {
  name: "Pratap Singh",
  email: "pratapsingh@gmail.com",
  password: "pratap@123",
  avatar:
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
  address: {
    city: "chakna para",
    street: "Himanchu street",
    pincode: 451278,
    landmark: "cholai chakna",
    houseno: 459317,
    name: "vtapper",
  },
  contactNo: 7531594862,
};

export const orderData = [
  {
    _id: 1,
    totalAmount: 50024,
    status: "Processing",
    date: "1st Nov",
    payment: "Card",
    shippingInfo: {
      name: "xyz 2 name",
      city: "kosin",
      state: "Nepal",
    },
    orderItems: [
      {
        product: productsList[0],
        qty: 1,
      },
    ],
  },
  {
    _id: 2,
    totalAmount: 12024,
    status: "Processing",
    date: "1st July",
    payment: "Cash",
    shippingInfo: {
      name: "xyz 2 name",
      city: "kosin",
      state: "Nepal",
    },
    orderItems: [
      {
        product: productsList[0],
        qty: 1,
      },
      {
        product: productsList[0],
        qty: 2,
      },
    ],
  },
  {
    _id: 3,
    totalAmount: 12024,
    status: "Processing",
    date: "1st July",
    payment: "Cash",
    shippingInfo: {
      name: "xyz 2 name",
      city: "kosin",
      state: "Nepal",
    },
    orderItems: [
      {
        product: productsList[0],
        qty: 1,
      },
      {
        product: productsList[0],
        qty: 2,
      },
    ],
  },
];
