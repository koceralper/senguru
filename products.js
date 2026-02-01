const storeConfig = {
    freeShippingThreshold: 2500,
    shippingCost: 125
};

const products = [
    {
        id: 1,
        title: "Portakal Cipsi",
        image: "images/portakal.png",
        description: "Kabuğuyla birlikte dilimlenmiş, C vitamini deposu kıtır lezzet.",
        badge: "Popüler",
        isActive: true,
        options: [
            { weight: "50 Gr", price: 55 },
            { weight: "100 Gr", price: 100 }
        ]
    },
    {
        id: 2,
        title: "Kuru Elma",
        image: "images/elma.png",
        description: "Mevsimin en tatlı elmaları, ince ince dilimlenip çıtır hale getirildi.",
        badge: "",
        isActive: true,
        options: [
            { weight: "50 Gr", price: 105 },
            { weight: "100 Gr", price: 200 }
        ]
    },
    {
        id: 3,
        title: "Kuru Limon",
        image: "images/limon.png",
        description: "Aromasıyla çaylarınıza ve sularınıza tazelik katan, kabuklu limon dilimleri.",
        badge: "",
        isActive: true,
        options: [
            { weight: "50 Gr", price: 130 },
            { weight: "100 Gr", price: 250}
        ]
    },
    {
        id: 4,
        title: "Cennet Hurması",
        image: "images/cennet_hurmasi.png",
        description: "Doğal şeker kaynağı, yumuşak dokusuyla enerji veren eşsiz lezzet.",
        badge: "Yeni",
        isActive: true,
        options: [
            { weight: "50 Gr", price: 135 },
            { weight: "100 Gr", price: 250 }
        ]
    },
    {
        id: 5,
        title: "Karışık Meyve Paketi",
        image: "images/hepsi.png",
        description: "Portakal, elma, limon ve hurmanın enfes uyumu bir arada.",
        badge: "Özel",
        isActive: false,
        options: [
            { weight: "50 Gr", price: 60 },
            { weight: "100 Gr", price: 100 },
            { weight: "250 Gr", price: 240 }
        ]
    },
    {
        id: 6,
        title: "Kuru Kivi",
        image: "images/kivi.png",
        description: "Mayhoş ve tatlı aromasıyla enerji deposu. C vitamini zengini, ince dilimlenmiş doğal lezzet.",
        badge: "Yeni",
        isActive: true,
        options: [
            { weight: "50 Gr", price: 160 },
            { weight: "100 Gr", price: 300 }
        ]
    }
];
