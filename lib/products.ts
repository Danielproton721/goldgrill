// Catálogo — produtos de churrasco. 230 produtos.
import { collections, type Collection } from "./collections";
export { collections } from "./collections";
export type { Collection } from "./collections";

export interface Product {
  id: number;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  category: string;
  slug: string;
  description: string;
  isTest?: boolean;
  tags?: string[];
}

export const products: Product[] = [
  {
    "id": 1,
    "name": "Grelhador Elétrico Portátil GG Plug N Play – Versão Copa",
    "price": 207.9,
    "compareAtPrice": 296,
    "image": "/images/produtos/grelhador-eletrico-portatil-gg-plug-n-play-versao-copa.png",
    "rating": 4.6,
    "reviews": 40,
    "category": "Churrasqueiras Elétricas",
    "slug": "grelhador-eletrico-portatil-gg-plug-n-play-versao-copa",
    "description": "<p>Grelhador Eletrico Portatil GG Plug N Play – VersãO Copa — produto da linha Churrasqueiras Elétricas da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.<br><br></p><p></p>",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelhador-eletrico-portatil-gg-plug-n-play-versao-copa.png"
    ]
  },
  {
    "id": 2,
    "name": "Grelhador Elétrico Portátil GG Plug N Joy",
    "price": 200.9,
    "compareAtPrice": 286.4,
    "image": "/images/produtos/grelhador-eletrico-portatil-gg-plug-n-joy.png",
    "rating": 4.8,
    "reviews": 77,
    "category": "Churrasqueiras Elétricas",
    "slug": "grelhador-eletrico-portatil-gg-plug-n-joy",
    "description": "Grelhador Eletrico Portatil GG Plug N Joy — produto da linha Churrasqueiras Elétricas da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelhador-eletrico-portatil-gg-plug-n-joy.png"
    ]
  },
  {
    "id": 3,
    "name": "Carrinho Portátil Churrasqueiras",
    "price": 190.9,
    "compareAtPrice": 272.8,
    "image": "/images/produtos/carrinho-portatil-churrasqueiras.png",
    "rating": 5,
    "reviews": 114,
    "category": "Churrasqueiras Portáteis",
    "slug": "carrinho-portatil-churrasqueiras",
    "description": "Carrinho Portátil Churrasqueiras — produto da linha Churrasqueiras Portáteis da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/carrinho-portatil-churrasqueiras.png"
    ]
  },
  {
    "id": 4,
    "name": "Depurador de Ar – W-HOOD",
    "price": 184.9,
    "compareAtPrice": 264,
    "image": "/images/produtos/depurador-de-ar-w-hood.jpg",
    "rating": 4.7,
    "reviews": 151,
    "category": "Acessórios de Churrasco",
    "slug": "depurador-de-ar-w-hood",
    "description": "Depurador de Ar – W-HOOD — produto da linha Depuradores da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/depurador-de-ar-w-hood.jpg"
    ]
  },
  {
    "id": 5,
    "name": "Depurador de Ar – I-HOOD",
    "price": 246.9,
    "compareAtPrice": 352,
    "image": "/images/produtos/depurador-de-ar-i-hood.jpg",
    "rating": 4.9,
    "reviews": 188,
    "category": "Acessórios de Churrasco",
    "slug": "depurador-de-ar-i-hood",
    "description": "Depurador de Ar – I-HOOD — produto da linha Depuradores da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/depurador-de-ar-i-hood.jpg"
    ]
  },
  {
    "id": 6,
    "name": "Espeto Giratorio ROTARY SPETO",
    "price": 44,
    "compareAtPrice": 88,
    "image": "/images/produtos/espeto-giratorio-rotary-speto.jpg",
    "rating": 4.6,
    "reviews": 225,
    "category": "Acessórios de Churrasco",
    "slug": "espeto-giratorio-rotary-speto",
    "description": "Espeto Giratorio ROTARY SPETO — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/espeto-giratorio-rotary-speto.jpg"
    ]
  },
  {
    "id": 7,
    "name": "Churrasqueira a gás Unique 301",
    "price": 242.9,
    "compareAtPrice": 346.93,
    "image": "/images/produtos/churrasqueira-a-gas-master-dxx301-3.png",
    "rating": 4.8,
    "reviews": 262,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxx-unique-301",
    "description": "Churrasqueira a gás Gold Grill Unique 301 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-master-dxx301-3.png"
    ]
  },
  {
    "id": 8,
    "name": "Churrasqueira a gás Unique 300",
    "price": 279.9,
    "compareAtPrice": 349.89,
    "image": "/images/produtos/churrasqueira-a-gas-compact-dxx300-3.png",
    "rating": 5,
    "reviews": 299,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxx-unique-300",
    "description": "Churrasqueira a gás Gold Grill Unique 300 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-compact-dxx300-3.png"
    ]
  },
  {
    "id": 9,
    "name": "Churrasqueira a gás Unique 201",
    "price": 266.9,
    "compareAtPrice": 332.64,
    "image": "/images/produtos/churrasqueira-a-gas-dxx-unique-201.png",
    "rating": 4.7,
    "reviews": 76,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxx-unique-201",
    "description": "Churrasqueira a gás Gold Grill Unique 201 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-dxx-unique-201.png"
    ]
  },
  {
    "id": 10,
    "name": "Churrasqueira a gás Classic 301",
    "price": 229.9,
    "compareAtPrice": 327.22,
    "image": "/images/produtos/churrasqueira-a-gas-master-dxx301-2.png",
    "rating": 4.9,
    "reviews": 113,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxx-classic-301",
    "description": "Churrasqueira a gás Gold Grill Classic 301 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-master-dxx301-2.png"
    ]
  },
  {
    "id": 11,
    "name": "Churrasqueira a gás Classic 300",
    "price": 290.9,
    "compareAtPrice": 363.44,
    "image": "/images/produtos/churrasqueira-a-gas-compact-dxx300-2.png",
    "rating": 4.6,
    "reviews": 150,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxx-classic-300",
    "description": "Churrasqueira a gás Gold Grill Classic 300 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-compact-dxx300-2.png"
    ]
  },
  {
    "id": 12,
    "name": "Churrasqueira a gás Classic 201",
    "price": 251.9,
    "compareAtPrice": 314.16,
    "image": "/images/produtos/churrasqueira-a-gas-slim-dxx201-2.png",
    "rating": 4.8,
    "reviews": 187,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxx-classic-201",
    "description": "Churrasqueira a gás Gold Grill Classic 201 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-slim-dxx201-2.png"
    ]
  },
  {
    "id": 13,
    "name": "Grelhador Elétrico Portátil GG Plug N Play",
    "price": 207.9,
    "compareAtPrice": 296,
    "image": "/images/produtos/grelhador-eletrico-portatil-gg-plug-n-play.png",
    "rating": 5,
    "reviews": 224,
    "category": "Churrasqueiras Elétricas",
    "slug": "grelhador-eletrico-portatil-gg-plug-n-play",
    "description": "Grelhador Eletrico Portatil GG Plug N Play — produto da linha Churrasqueiras Elétricas da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelhador-eletrico-portatil-gg-plug-n-play.png"
    ]
  },
  {
    "id": 14,
    "name": "Churrasqueira a gás portátil DXX200",
    "price": 258.9,
    "compareAtPrice": 369.6,
    "image": "/images/produtos/churrasqueira-a-gas-portatil-dxx200.png",
    "rating": 4.7,
    "reviews": 261,
    "category": "Churrasqueiras Portáteis",
    "slug": "churrasqueira-a-gas-portatil-dxx200",
    "description": "Churrasqueira a gás portátil DXX200 — produto da linha Churrasqueiras Portáteis da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-portatil-dxx200.png"
    ]
  },
  {
    "id": 15,
    "name": "Churrasqueira a gás Ultra DXX901",
    "price": 296.9,
    "compareAtPrice": 375.32,
    "image": "/images/produtos/churrasqueira-a-gas-ultra-dxx901.png",
    "rating": 4.9,
    "reviews": 298,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-ultra-dxx901",
    "description": "Churrasqueira a gás Ultra DXX901 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-ultra-dxx901.png"
    ]
  },
  {
    "id": 16,
    "name": "Chopeira Coldraft Chopp",
    "price": 195.9,
    "compareAtPrice": 391.6,
    "image": "/images/produtos/chopeira-coldraft-chopp.jpeg",
    "rating": 4.6,
    "reviews": 75,
    "category": "Acessórios de Churrasco",
    "slug": "chopeira-coldraft-chopp",
    "description": "Gold Grill Coldraft Chopp — produto da linha Chopeira da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/chopeira-coldraft-chopp.jpeg"
    ]
  },
  {
    "id": 17,
    "name": "Suporte de Espeto Rotary",
    "price": 56.9,
    "compareAtPrice": 74.8,
    "image": "/images/produtos/suporte-de-espeto-rotary.png",
    "rating": 4.8,
    "reviews": 112,
    "category": "Acessórios de Churrasco",
    "slug": "suporte-de-espeto-rotary",
    "description": "Suporte de Espeto Rotary — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/suporte-de-espeto-rotary.png"
    ]
  },
  {
    "id": 18,
    "name": "Grelha Uruguaia",
    "price": 70.9,
    "compareAtPrice": 140.8,
    "image": "/images/produtos/grelha-uruguaia.png",
    "rating": 5,
    "reviews": 149,
    "category": "Acessórios de Churrasco",
    "slug": "grelha-uruguaia",
    "description": "Grelha Uruguaia — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelha-uruguaia.png"
    ]
  },
  {
    "id": 19,
    "name": "Kit de Limpeza para Churrasqueira",
    "price": 42.9,
    "compareAtPrice": 57.2,
    "image": "/images/produtos/kit-de-limpeza-para-churrasqueira.png",
    "rating": 4.7,
    "reviews": 186,
    "category": "Acessórios de Churrasco",
    "slug": "kit-de-limpeza-para-churrasqueira",
    "description": "Kit de Limpeza Gold Grill — produto da linha Produtos de Limpeza da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/kit-de-limpeza-para-churrasqueira.png"
    ]
  },
  {
    "id": 20,
    "name": "Smoker box",
    "price": 46.9,
    "compareAtPrice": 92.4,
    "image": "/images/produtos/smoker-box.png",
    "rating": 4.9,
    "reviews": 223,
    "category": "Acessórios de Churrasco",
    "slug": "smoker-box",
    "description": "Smoker box — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/smoker-box.png"
    ]
  },
  {
    "id": 21,
    "name": "Tampa Basculante",
    "price": 143.9,
    "compareAtPrice": 286,
    "image": "/images/produtos/tampa-basculante.png",
    "rating": 4.6,
    "reviews": 260,
    "category": "Acessórios de Churrasco",
    "slug": "tampa-basculante",
    "description": "Tampa Basculante — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/tampa-basculante.png"
    ]
  },
  {
    "id": 22,
    "name": "Segundo Nível de Grelha",
    "price": 46.9,
    "compareAtPrice": 92.4,
    "image": "/images/produtos/segundo-nivel-de-grelha.png",
    "rating": 4.8,
    "reviews": 297,
    "category": "Acessórios de Churrasco",
    "slug": "segundo-nivel-de-grelha",
    "description": "Segundo Nível de Grelha — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/segundo-nivel-de-grelha.png"
    ]
  },
  {
    "id": 23,
    "name": "Tampa Bafo Linha Glass",
    "price": 187.9,
    "compareAtPrice": 374,
    "image": "/images/produtos/tampa-bafo-linha-glass.png",
    "rating": 5,
    "reviews": 74,
    "category": "Churrasqueiras a Gás",
    "slug": "tampa-bafo-linha-glass",
    "description": "Tampa Bafo Linha Glass — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/tampa-bafo-linha-glass.png"
    ]
  },
  {
    "id": 24,
    "name": "Grelhador Elétrico de Sobrepor – GG On Top",
    "price": 275.9,
    "compareAtPrice": 344.96,
    "image": "/images/produtos/grelhador-eletrico-de-sobrepor-gg-on-top.png",
    "rating": 4.7,
    "reviews": 111,
    "category": "Churrasqueiras Elétricas",
    "slug": "grelhador-eletrico-de-sobrepor-gg-on-top",
    "description": "Grelhador Elétrico de Sobrepor – GG On Top — produto da linha Churrasqueiras Elétricas da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelhador-eletrico-de-sobrepor-gg-on-top.png"
    ]
  },
  {
    "id": 25,
    "name": "Grelhador Elétrico de Embutir GG300",
    "price": 220.9,
    "compareAtPrice": 315.39,
    "image": "/images/produtos/grelhador-eletrico-de-embutir-gg300.png",
    "rating": 4.9,
    "reviews": 148,
    "category": "Churrasqueiras Elétricas",
    "slug": "grelhador-eletrico-de-embutir-gg300",
    "description": "Grelhador Elétrico de Embutir GG300 — produto da linha Churrasqueiras Elétricas da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelhador-eletrico-de-embutir-gg300.png"
    ]
  },
  {
    "id": 26,
    "name": "Churrasqueira a gás DXXGLASS 301",
    "price": 270.9,
    "compareAtPrice": 386.35,
    "image": "/images/produtos/churrasqueira-a-gas-dxxglass-301.png",
    "rating": 4.6,
    "reviews": 185,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxxglass-301",
    "description": "Churrasqueira a gás DXXGLASS 301 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-dxxglass-301.png"
    ]
  },
  {
    "id": 27,
    "name": "Grelha Ferro Fundido",
    "price": 145.9,
    "compareAtPrice": 290.4,
    "image": "/images/produtos/grelha-ferro-fundido.png",
    "rating": 4.8,
    "reviews": 222,
    "category": "Acessórios de Churrasco",
    "slug": "grelha-ferro-fundido",
    "description": "Grelha Ferro Fundido — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelha-ferro-fundido.png"
    ]
  },
  {
    "id": 28,
    "name": "Churrasqueira a gás DXXGLASS 300",
    "price": 218.9,
    "compareAtPrice": 311.45,
    "image": "/images/produtos/churrasqueira-a-gas-dxxglass-300.png",
    "rating": 5,
    "reviews": 259,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-dxxglass-300",
    "description": "Churrasqueira a gás DXXGLASS 300 — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-dxxglass-300.png"
    ]
  },
  {
    "id": 29,
    "name": "Conjunto Barras Uruguaias",
    "price": 56.9,
    "compareAtPrice": 74.8,
    "image": "/images/produtos/conjunto-barras-uruguaias.png",
    "rating": 4.7,
    "reviews": 296,
    "category": "Acessórios de Churrasco",
    "slug": "conjunto-barras-uruguaias",
    "description": "Conjunto Barras Uruguaias — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/conjunto-barras-uruguaias.png"
    ]
  },
  {
    "id": 30,
    "name": "Grelha Colmeia",
    "price": 70.9,
    "compareAtPrice": 140.8,
    "image": "/images/produtos/grelha-colmeia.png",
    "rating": 4.9,
    "reviews": 73,
    "category": "Acessórios de Churrasco",
    "slug": "grelha-colmeia",
    "description": "Grelha Colmeia — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelha-colmeia.png"
    ]
  },
  {
    "id": 31,
    "name": "Grelha Flame",
    "price": 94.9,
    "compareAtPrice": 189.2,
    "image": "/images/produtos/grelha-flame.png",
    "rating": 4.6,
    "reviews": 110,
    "category": "Churrasqueiras Portáteis",
    "slug": "grelha-flame",
    "description": "Grelha Flame — produto da linha Churrasqueiras Portáteis da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelha-flame.png"
    ]
  },
  {
    "id": 32,
    "name": "Tampa De Acabamento",
    "price": 79.9,
    "compareAtPrice": 158.4,
    "image": "/images/produtos/tampa-de-acabamento-dxx.png",
    "rating": 4.8,
    "reviews": 147,
    "category": "Acessórios de Churrasco",
    "slug": "tampa-de-acabamento-dxx",
    "description": "Tampa De Acabamento Gold Grill — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/tampa-de-acabamento-dxx.png"
    ]
  },
  {
    "id": 33,
    "name": "Churrasqueira à Gás ESSENTIAL",
    "price": 240.9,
    "compareAtPrice": 343.2,
    "image": "/images/produtos/churrasqueira-a-gas-essential.png",
    "rating": 5,
    "reviews": 184,
    "category": "Churrasqueiras a Gás",
    "slug": "churrasqueira-a-gas-essential",
    "description": "Churrasqueira à Gás Gold Grill ESSENTIAL — produto da linha Churrasqueiras a Gás da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/churrasqueira-a-gas-essential.png"
    ]
  },
  {
    "id": 34,
    "name": "Boné Trucker Churrasqueiro",
    "price": 48.9,
    "compareAtPrice": 68.46,
    "image": "/images/produtos/bone-trucker-churrasqueiro.png",
    "rating": 4.7,
    "reviews": 221,
    "category": "Acessórios de Churrasco",
    "slug": "bone-trucker-churrasqueiro",
    "description": "Boné Trucker – Gold Grill — produto da linha Souvenirs da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/bone-trucker-churrasqueiro.png"
    ]
  },
  {
    "id": 35,
    "name": "Forno de Pizza a Gás GG400",
    "price": 295.9,
    "compareAtPrice": 369.6,
    "image": "/images/produtos/forno-de-pizza-a-gas-gg400.png",
    "rating": 4.9,
    "reviews": 258,
    "category": "Forno de Pizza e Pás",
    "slug": "forno-de-pizza-a-gas-gg400",
    "description": "Forno de Pizza a gás – Gold Grill FDX400 — produto da linha Forno de Pizza da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/forno-de-pizza-a-gas-gg400.png"
    ]
  },
  {
    "id": 36,
    "name": "Churrasqueira a gás Vertical Flame",
    "price": 268.9,
    "compareAtPrice": 335.1,
    "image": "/images/produtos/flame_churrasqueiravertical.png",
    "rating": 4.6,
    "reviews": 295,
    "category": "Churrasqueiras Portáteis",
    "slug": "churrasqueira-a-gas-vertical-flame",
    "description": "Churrasqueira a gás Vertical Flame — produto da linha Churrasqueiras Portáteis da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/flame_churrasqueiravertical.png"
    ]
  },
  {
    "id": 37,
    "name": "Cook Top ONE",
    "price": 209.9,
    "compareAtPrice": 418,
    "image": "/images/produtos/cook-top-one.png",
    "rating": 4.8,
    "reviews": 72,
    "category": "Acessórios de Churrasco",
    "slug": "cook-top-one",
    "description": "Cook Top ONE — produto da linha Cooktop da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/cook-top-one.png"
    ]
  },
  {
    "id": 38,
    "name": "Suporte de Espeto Fixo",
    "price": 39.6,
    "compareAtPrice": 79.2,
    "image": "/images/produtos/suporte-de-espeto-fixo.png",
    "rating": 5,
    "reviews": 109,
    "category": "Acessórios de Churrasco",
    "slug": "suporte-de-espeto-fixo",
    "description": "Suporte de Espeto Fixo — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/suporte-de-espeto-fixo.png"
    ]
  },
  {
    "id": 39,
    "name": "Grelha Argentina",
    "price": 94.9,
    "compareAtPrice": 189.2,
    "image": "/images/produtos/grelha-argentina.png",
    "rating": 4.7,
    "reviews": 146,
    "category": "Acessórios de Churrasco",
    "slug": "grelha-argentina",
    "description": "Grelha Argentina — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelha-argentina.png"
    ]
  },
  {
    "id": 40,
    "name": "Forma de pizza em pedra sabão",
    "price": 33,
    "compareAtPrice": 220,
    "image": "/images/produtos/forma-de-pizza-em-pedra-sabao-2.png",
    "rating": 4.9,
    "reviews": 183,
    "category": "Acessórios de Churrasco",
    "slug": "forma-de-pizza-em-pedra-sabao",
    "description": "Forma de pizza em pedra sabão — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/forma-de-pizza-em-pedra-sabao-2.png"
    ]
  },
  {
    "id": 41,
    "name": "Grelha DXX200",
    "price": 56.9,
    "compareAtPrice": 74.8,
    "image": "/images/produtos/grelha-dxx200.png",
    "rating": 4.6,
    "reviews": 220,
    "category": "Acessórios de Churrasco",
    "slug": "grelha-dxx200",
    "description": "Grelha DXX200 — produto da linha Acessórios da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/grelha-dxx200.png"
    ]
  },
  {
    "id": 42,
    "name": "Personalize sua Churrasqueira",
    "price": 5,
    "compareAtPrice": 0,
    "image": "/images/produtos/personalize-sua-churrasqueira.jpg",
    "rating": 4.8,
    "reviews": 257,
    "category": "Acessórios de Churrasco",
    "slug": "personalize-sua-churrasqueira",
    "description": "Personalize sua Gold Grill — produto da linha Souvenirs da nossa loja. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/personalize-sua-churrasqueira.jpg"
    ]
  },
  {
    "id": 43,
    "name": "Kit Churrasco Personalizado Mestre do Churrasco",
    "price": 42.1,
    "compareAtPrice": 84.19,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-mestre-do-churrasco.png",
    "rating": 4.6,
    "reviews": 45,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-mestre-do-churrasco",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-mestre-do-churrasco.png"
    ]
  },
  {
    "id": 44,
    "name": "Kit para Churrasco Personalizado Faca Chaira Garra de Urso",
    "price": 60.9,
    "compareAtPrice": 120.8,
    "image": "/images/produtos/wb-kit-para-churrasco-personalizado-faca-chaira-garra-de-urso.png",
    "rating": 4.8,
    "reviews": 86,
    "category": "Kits de Presente",
    "slug": "kit-para-churrasco-personalizado-faca-chaira-garra-de-urso",
    "description": "Para quem valoriza tradição e estilo no preparo do churrasco, esta combinação une elegância e funcionalidade, tornando cada momento ao redor da churrasqueira ainda mais especial.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-para-churrasco-personalizado-faca-chaira-garra-de-urso.png"
    ]
  },
  {
    "id": 45,
    "name": "Kit Churrasco Personalizado Artesanal Parrillero Essencial",
    "price": 53.9,
    "compareAtPrice": 107.65,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-parrillero-essencial.png",
    "rating": 5,
    "reviews": 127,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-parrillero-essencial",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-parrillero-essencial.png"
    ]
  },
  {
    "id": 46,
    "name": "Kit Churrasco Personalizado Do Chef",
    "price": 53.9,
    "compareAtPrice": 106.33,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-do-chef.png",
    "rating": 4.7,
    "reviews": 168,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-do-chef",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-do-chef.png"
    ]
  },
  {
    "id": 47,
    "name": "Kit Churrasco Personalizado Churrasqueiro Oficial da Família",
    "price": 30.39,
    "compareAtPrice": 202.62,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-churrasqueiro-oficial-da-familia-1.png",
    "rating": 4.9,
    "reviews": 209,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-churrasqueiro-oficial-da-familia",
    "description": "O Presente Perfeito para Amantes de Churrasco! Surpreenda com o Kit Churrasco Premium, ideal para quem ama preparar e saborear um bom churrasco. Este kit completo vem em uma elegante caixa de MDF, perfeito para presentear em aniversários, Dia dos Pais, casamentos e outras ocasiões especiais.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-churrasqueiro-oficial-da-familia-1.png"
    ]
  },
  {
    "id": 48,
    "name": "Kit para Churrasco Personalizado c/ Garra de Urso Faca 7\" + Caixa p/ Presente",
    "price": 45.82,
    "compareAtPrice": 91.63,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-masterchef.png",
    "rating": 4.6,
    "reviews": 250,
    "category": "Kits de Presente",
    "slug": "kit-para-churrasco-personalizado-c-garra-de-urso-faca-7-caixa-p-presente",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-masterchef.png"
    ]
  },
  {
    "id": 49,
    "name": "Kit Churrasco Personalizado Edição Especial",
    "price": 41.09,
    "compareAtPrice": 54.78,
    "image": "/images/produtos/kit-churrasco-personalizado-edicao-especial.png",
    "rating": 4.8,
    "reviews": 51,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-edicao-especial",
    "description": "Uma edição criada para impressionar em cada detalhe. Este presente combina força, elegância e exclusividade, pensado para quem valoriza momentos únicos ao redor da brasa.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/kit-churrasco-personalizado-edicao-especial.png"
    ]
  },
  {
    "id": 50,
    "name": "Kit Churrasco Personalizado Mestre Do Churrasco Série Especial",
    "price": 55.9,
    "compareAtPrice": 74.64,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-mestre-do-churrasco-serie-especial-1.png",
    "rating": 5,
    "reviews": 92,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-mestre-do-churrasco-serie-especial",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-mestre-do-churrasco-serie-especial-1.png"
    ]
  },
  {
    "id": 51,
    "name": "Kit Churrasco Personalizado Doutor Churras",
    "price": 41.39,
    "compareAtPrice": 55.18,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-doutor-churras.png",
    "rating": 4.7,
    "reviews": 133,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-doutor-churras",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-doutor-churras.png"
    ]
  },
  {
    "id": 52,
    "name": "Kit Churrasco Personalizado With All c/ Caixa de Presente",
    "price": 56.9,
    "compareAtPrice": 113.03,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-with-all-c-caixa-de-presente.png",
    "rating": 4.9,
    "reviews": 174,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-with-all-c-caixa-de-presente",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-with-all-c-caixa-de-presente.png"
    ]
  },
  {
    "id": 53,
    "name": "Kit Churrasco Personalizado Essentials BBQ",
    "price": 55.9,
    "compareAtPrice": 74.57,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-essentials-bbq.png",
    "rating": 4.6,
    "reviews": 215,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-essentials-bbq",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais, este conjunto transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-essentials-bbq.png"
    ]
  },
  {
    "id": 54,
    "name": "Kit Churrasco Personalizado com Faca 7” e Acessórios | Presente Ideal",
    "price": 56.9,
    "compareAtPrice": 112.7,
    "image": "/images/produtos/kit-churrasco-personalizado-com-faca-7-e-acessorios-presente-ideal.png",
    "rating": 4.8,
    "reviews": 256,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-com-faca-7-e-acessorios-presente-ideal",
    "description": "Um presente de presença forte e significado duradouro. Criado para celebrar momentos ao redor do fogo, com personalidade, elegância e um toque de exclusividade que transforma o ato de presentear em uma verdadeira homenagem.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/kit-churrasco-personalizado-com-faca-7-e-acessorios-presente-ideal.png"
    ]
  },
  {
    "id": 55,
    "name": "Kit Petisqueira Tábua Faca Presente Frios Petiscos Churrasco",
    "price": 58.9,
    "compareAtPrice": 116.19,
    "image": "/images/produtos/wb-kit-petisqueira-tabua-faca-presente-frios-petiscos-churrasco.png",
    "rating": 5,
    "reviews": 57,
    "category": "Kits de Presente",
    "slug": "kit-petisqueira-tabua-faca-presente-frios-petiscos-churrasco",
    "description": "Este conjunto foi cuidadosamente elaborado para transformar momentos à mesa em experiências memoráveis. Combinando elegância e funcionalidade, é a escolha ideal para presentear aqueles que apreciam o churrasco com sofisticação e autenticidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-petisqueira-tabua-faca-presente-frios-petiscos-churrasco.png"
    ]
  },
  {
    "id": 56,
    "name": "Kit Churrasco Premium com Faca | Presente Ideal para Churrasqueiro",
    "price": 48.9,
    "compareAtPrice": 96.13,
    "image": "/images/produtos/wb-kit-churrasco-premium-churrasco-p-presente-faca.png",
    "rating": 4.7,
    "reviews": 98,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-premium-com-faca-presente-ideal-para-churrasqueiro",
    "description": "Este conjunto foi cuidadosamente elaborado para transformar momentos à mesa em experiências memoráveis. Combinando elegância e funcionalidade, é a escolha ideal para presentear aqueles que apreciam o ritual do churrasco com sofisticação e autenticidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-premium-churrasco-p-presente-faca.png"
    ]
  },
  {
    "id": 57,
    "name": "Kit com Tábua de Corte e Petisqueira com 4 Garfos para Petiscos",
    "price": 37.23,
    "compareAtPrice": 49.64,
    "image": "/images/produtos/wb-kit-com-tabua-de-corte-petisqueira-c-4-garfos-p-petiscos.png",
    "rating": 4.9,
    "reviews": 139,
    "category": "Kits de Presente",
    "slug": "kit-com-tabua-de-corte-e-petisqueira-com-4-garfos-para-petiscos",
    "description": "Pensado para impressionar em momentos especiais, este kit une duas peças que traduzem cuidado, bom gosto e funcionalidade. Um presente completo que carrega autenticidade e convida à celebração. Perfeito para marcar ocasiões com afeto e elegância.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-com-tabua-de-corte-petisqueira-c-4-garfos-p-petiscos.png"
    ]
  },
  {
    "id": 58,
    "name": "Conjunto para Churrasco Personalizado com Tábua e Faca | Presente Especial",
    "price": 39.08,
    "compareAtPrice": 78.16,
    "image": "/images/produtos/wb-conjunto-para-churrasco-tabua-e-faca-personalizado-presente.png",
    "rating": 4.6,
    "reviews": 180,
    "category": "Kits de Presente",
    "slug": "conjunto-para-churrasco-personalizado-com-tabua-e-faca-presente-especial",
    "description": "Um presente que une sofisticação e funcionalidade. Este conjunto é ideal para quem valoriza momentos especiais ao redor da grelha, oferecendo uma experiência única e memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-conjunto-para-churrasco-tabua-e-faca-personalizado-presente.png"
    ]
  },
  {
    "id": 59,
    "name": "Kit Churrasco Personalizado Artesanal Life Bbq",
    "price": 66.9,
    "compareAtPrice": 133.62,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-life-bbq.png",
    "rating": 4.8,
    "reviews": 221,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-life-bbq",
    "description": "Para quem valoriza tradição e estilo no preparo do churrasco, esta combinação une elegância e funcionalidade, tornando cada momento ao redor da churrasqueira ainda mais especial.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-life-bbq.png"
    ]
  },
  {
    "id": 60,
    "name": "Kit Churrasco Personalizado Chef Parrillero",
    "price": 43.41,
    "compareAtPrice": 86.81,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-chef-parrillero.png",
    "rating": 5,
    "reviews": 262,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-chef-parrillero",
    "description": "Presenteie com elegância e presença. Um kit pensado para impressionar quem valoriza momentos únicos, com peças que combinam rusticidade, contraste e um toque artesanal que fala por si.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-chef-parrillero.png"
    ]
  },
  {
    "id": 61,
    "name": "Kit Churrasco Personalizado Secrets",
    "price": 62.9,
    "compareAtPrice": 124.22,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-secrets.png",
    "rating": 4.7,
    "reviews": 63,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-secrets",
    "description": "Um presente que une sofisticação e funcionalidade. Este kit é ideal para quem valoriza momentos especiais ao redor da grelha, oferecendo uma experiência única e memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-secrets.png"
    ]
  },
  {
    "id": 62,
    "name": "Kit Churrasco Personalizado Artesanal Damascus BBQ",
    "price": 56.9,
    "compareAtPrice": 112.44,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-damascus-bbq.png",
    "rating": 4.9,
    "reviews": 104,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-damascus-bbq",
    "description": "Um presente que une sofisticação e funcionalidade. Este kit é ideal para quem valoriza momentos especiais ao redor da grelha, oferecendo uma experiência única e memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-damascus-bbq.png"
    ]
  },
  {
    "id": 63,
    "name": "Kit Churrasco Personalizado Artesanal BBQ Forever",
    "price": 57.9,
    "compareAtPrice": 114.87,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-bbq-forever.png",
    "rating": 4.6,
    "reviews": 145,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-bbq-forever",
    "description": "Um presente que une sofisticação e funcionalidade. Este kit é ideal para quem valoriza momentos especiais ao redor da grelha, oferecendo uma experiência única e memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-bbq-forever.png"
    ]
  },
  {
    "id": 64,
    "name": "Kit Churrasco Personalizado Life BBQ Supreme",
    "price": 46.9,
    "compareAtPrice": 92.48,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-life-bbq-supreme.png",
    "rating": 4.8,
    "reviews": 186,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-life-bbq-supreme",
    "description": "Elegância e funcionalidade reunidas em um presente feito para impressionar. Uma escolha perfeita para quem valoriza momentos ao redor da churrasqueira com estilo e personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-life-bbq-supreme.png"
    ]
  },
  {
    "id": 65,
    "name": "Kit Churrasco Personalizado Artesanal BBQ Masters",
    "price": 78.9,
    "compareAtPrice": 157.98,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-bbq-masters.png",
    "rating": 5,
    "reviews": 227,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-bbq-masters",
    "description": "Para quem leva o churrasco a sério, esta combinação une robustez, estilo e funcionalidade. Um presente que impressiona pela presença e pela utilidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-bbq-masters.png"
    ]
  },
  {
    "id": 66,
    "name": "Kit Churrasco Personalizado Origens Black and White",
    "price": 72.9,
    "compareAtPrice": 145.26,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-origens-black-and-white.png",
    "rating": 4.7,
    "reviews": 268,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-origens-black-and-white",
    "description": "Presenteie com elegância e presença. Um kit pensado para impressionar quem valoriza momentos únicos, com peças que combinam rusticidade, contraste e um toque artesanal que fala por si.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-origens-black-and-white.png"
    ]
  },
  {
    "id": 67,
    "name": "Kit Churrasco Personalizado Artesanal Luxurious Design",
    "price": 82.9,
    "compareAtPrice": 164.38,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-luxurious-design.png",
    "rating": 4.9,
    "reviews": 69,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-luxurious-design",
    "description": "Para quem valoriza tradição e estilo no preparo do churrasco, esta combinação une elegância e funcionalidade, tornando cada momento ao redor da churrasqueira ainda mais especial.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-luxurious-design.png"
    ]
  },
  {
    "id": 68,
    "name": "Kit Churrasco Personalizado Artesanal Churras Essencial",
    "price": 41.89,
    "compareAtPrice": 83.78,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-churras-essencial.png",
    "rating": 4.6,
    "reviews": 110,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-churras-essencial",
    "description": "Para quem valoriza tradição e estilo no preparo do churrasco, esta combinação une elegância e funcionalidade, tornando cada momento ao redor da churrasqueira ainda mais especial.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-churras-essencial.png"
    ]
  },
  {
    "id": 69,
    "name": "Kit para Churrasco Personalizado Artesanal Damascus Design",
    "price": 83.9,
    "compareAtPrice": 166.3,
    "image": "/images/produtos/wb-kit-para-churrasco-personalizado-artesanal-damascus-design.png",
    "rating": 4.8,
    "reviews": 151,
    "category": "Kits de Presente",
    "slug": "kit-para-churrasco-personalizado-artesanal-damascus-design",
    "description": "Um presente que carrega história, tradição e personalidade. Com detalhes marcantes e acabamento artesanal, este kit transforma qualquer churrasco em um ritual de respeito ao sabor e à arte de presentear com estilo.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-para-churrasco-personalizado-artesanal-damascus-design.png"
    ]
  },
  {
    "id": 70,
    "name": "Kit Churrasco Personalizado Artesanal Origens",
    "price": 75.9,
    "compareAtPrice": 151.23,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-artesanal-origens.png",
    "rating": 5,
    "reviews": 192,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-artesanal-origens",
    "description": "Um presente que carrega história, tradição e personalidade. Com detalhes marcantes e acabamento artesanal, este kit transforma qualquer churrasco em um ritual de respeito ao sabor e à arte de presentear com estilo.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-artesanal-origens.png"
    ]
  },
  {
    "id": 71,
    "name": "Kit para Churrasco Personalizado Origens Black",
    "price": 54.9,
    "compareAtPrice": 108.05,
    "image": "/images/produtos/wb-kit-para-churrasco-personalizado-origens-black.png",
    "rating": 4.7,
    "reviews": 233,
    "category": "Kits de Presente",
    "slug": "kit-para-churrasco-personalizado-origens-black",
    "description": "Um presente que carrega história, tradição e personalidade. Com detalhes marcantes e acabamento artesanal, este kit transforma qualquer churrasco em um ritual de respeito ao sabor e à arte de presentear com estilo.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-para-churrasco-personalizado-origens-black.png"
    ]
  },
  {
    "id": 72,
    "name": "Kit para Churrasco em Madeira Teca com 3 Peças | Presente Gourmet",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/wb-conj-para-churrasco-madeira-teca-3-pcs.png",
    "rating": 4.9,
    "reviews": 274,
    "category": "Kits de Presente",
    "slug": "kit-para-churrasco-em-madeira-teca-com-3-pecas-presente-gourmet",
    "description": "Este conjunto une elegância, funcionalidade e personalidade para transformar qualquer churrasco em um momento inesquecível. Perfeito para surpreender com estilo, onde o bom gosto fala mais alto.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-conj-para-churrasco-madeira-teca-3-pcs.png"
    ]
  },
  {
    "id": 73,
    "name": "Kit Churrasco Personalizado p Presente Faca Teca 7'' + Garra de Urso e Tábua com Berço",
    "price": 51.9,
    "compareAtPrice": 69.09,
    "image": "/images/produtos/wb-kit-churrasco-personalizado-p-presente-faca-teca-7-garra-de-urso.png",
    "rating": 4.6,
    "reviews": 75,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-personalizado-p-presente-faca-teca-7-garra-de-urso-e-tabua-com-berco",
    "description": "Um presente inesquecível para quem ama bons momentos. Este kit une estilo, qualidade e emoção em cada detalhe. Ideal para surpreender com personalidade e bom gosto.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-churrasco-personalizado-p-presente-faca-teca-7-garra-de-urso.png"
    ]
  },
  {
    "id": 74,
    "name": "Conjunto Garfo Trinchante e Faca 7\" Cabo em Chifre com Estojo em Madeira",
    "price": 42.75,
    "compareAtPrice": 85.49,
    "image": "/images/produtos/wb-conjunto-garfo-trinchante-e-faca-7-cabo-em-chifre-com-estojo-em-madeira.png",
    "rating": 4.8,
    "reviews": 116,
    "category": "Kits de Presente",
    "slug": "conjunto-garfo-trinchante-e-faca-7-cabo-em-chifre-com-estojo-em-madeira",
    "description": "Um presente que une sofisticação e funcionalidade. Este conjunto é ideal para quem valoriza momentos especiais ao redor da grelha, oferecendo uma experiência única e memorável. Um presente que une sofisticação e funcionalidade. Este conjunto é ideal para quem valoriza momentos especiais ao redor da ",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-conjunto-garfo-trinchante-e-faca-7-cabo-em-chifre-com-estojo-em-madeira.png"
    ]
  },
  {
    "id": 75,
    "name": "Avental Preto Profissional em Brim com Bolso | Resistente para Cozinha, Churrasco, Cafés e Restaurantes",
    "price": 46.9,
    "compareAtPrice": 65.66,
    "image": "/images/produtos/avental-preto-profissional-em-brim-com-bolso-resistente-para-cozinha-churrasco-cafes-e-restaurantes.png",
    "rating": 5,
    "reviews": 157,
    "category": "Kits de Presente",
    "slug": "avental-preto-profissional-em-brim-com-bolso-resistente-para-cozinha-churrasco-cafes-e-restaurantes",
    "description": "O Avental Preto Profissional em Brim com Bolso é aquele presente útil, criativo e cheio de personalidade para quem ama cozinhar, fazer churrasco, preparar receitas especiais ou receber amigos e família em casa. Com visual elegante na cor preta, ele combina facilmente com diferentes estilos e deixa o",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/avental-preto-profissional-em-brim-com-bolso-resistente-para-cozinha-churrasco-cafes-e-restaurantes.png"
    ]
  },
  {
    "id": 76,
    "name": "Conjunto com Garfo Trinchante e Faca com Cabo em Osso e Chifre e Estojo em Madeira",
    "price": 42.75,
    "compareAtPrice": 85.49,
    "image": "/images/produtos/wb-conjunto-garfo-trinchante-e-faca-cabo-osso-e-chifre-com-estojo-em-madeira-1.png",
    "rating": 4.7,
    "reviews": 198,
    "category": "Kits de Presente",
    "slug": "conjunto-com-garfo-trinchante-e-faca-com-cabo-em-osso-e-chifre-e-estojo-em-madeira",
    "description": "Um presente que une sofisticação e funcionalidade. Este conjunto é ideal para quem valoriza momentos especiais ao redor da grelha, oferecendo uma experiência única e memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-conjunto-garfo-trinchante-e-faca-cabo-osso-e-chifre-com-estojo-em-madeira-1.png"
    ]
  },
  {
    "id": 77,
    "name": "Garfo Trinchante 8\" com Cabo em Osso e Chifre",
    "price": 34.02,
    "compareAtPrice": 45.36,
    "image": "/images/produtos/wb-garfo-trinchante-8-com-cabo-em-osso-e-chifre.png",
    "rating": 4.9,
    "reviews": 239,
    "category": "Kits de Presente",
    "slug": "garfo-trinchante-8-com-cabo-em-osso-e-chifre",
    "description": "Transforme um simples momento em uma memória inesquecível. Um presente pensado para quem valoriza tradições, celebra conquistas e entende que os melhores encontros merecem peças que contam histórias.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garfo-trinchante-8-com-cabo-em-osso-e-chifre.png"
    ]
  },
  {
    "id": 78,
    "name": "Copo Cuia Térmico 360ml Inox com Tampa Vedada Bebidas Quentes ou Geladas por Horas",
    "price": 45.9,
    "compareAtPrice": 64.26,
    "image": "/images/produtos/wb-copo-cuia-termico-360ml-inox-com-tampa-vedada-bebidas-quentes-ou-geladas-por-horas.png",
    "rating": 4.8,
    "reviews": 86,
    "category": "Copos e Térmicos",
    "slug": "copo-cuia-termico-360ml-inox-com-tampa-vedada-bebidas-quentes-ou-geladas-por-horas",
    "description": "Parede térmica em aço inox resistente, ideal para café, chimarrão, tereré, chá ou drinks. Compacto, portátil e perfeito para trabalho, viagens ou uso diário.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-copo-cuia-termico-360ml-inox-com-tampa-vedada-bebidas-quentes-ou-geladas-por-horas.png"
    ]
  },
  {
    "id": 79,
    "name": "Kit Bar Luxo – Caixa Preta para Destilados com 2 Copos",
    "price": 53.9,
    "compareAtPrice": 75.46,
    "image": "/images/produtos/wb-kit-bar-luxo-caixa-preta-para-destilados-com-2-copos.png",
    "rating": 5,
    "reviews": 127,
    "category": "Kits Gourmet",
    "slug": "kit-bar-luxo-caixa-preta-para-destilados-com-2-copos",
    "description": "Kit Bar Luxo com caixa preta e dois copos, ideal para servir destilados com elegância ou presentear com sofisticação.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-bar-luxo-caixa-preta-para-destilados-com-2-copos.png"
    ]
  },
  {
    "id": 80,
    "name": "Faca Aço Damasco 7\" Artesanal Personalizada com Bainha",
    "price": 53.9,
    "compareAtPrice": 107.78,
    "image": "/images/produtos/wb-faca-aco-damasco-7-artesanal-personalizada.png",
    "rating": 4.7,
    "reviews": 168,
    "category": "Facas",
    "slug": "faca-aco-damasco-7-artesanal-personalizada-com-bainha",
    "description": "Uma peça exclusiva que une tradição e sofisticação. Produzida em aço damasco, oferece alta durabilidade e acabamento único. Acompanha bainha e opção de personalização, tornando-se um presente marcante e cheio de significado. Ideal para quem valoriza qualidade e estilo.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-aco-damasco-7-artesanal-personalizada.png"
    ]
  },
  {
    "id": 81,
    "name": "Faca e Chaira Artesanais Personalizadas em Aço Inox 7” com Bainha e Cabo em Chifre e Osso",
    "price": 52.9,
    "compareAtPrice": 69.58,
    "image": "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-7-c-bainha.png",
    "rating": 4.9,
    "reviews": 209,
    "category": "Facas",
    "slug": "faca-e-chaira-artesanais-personalizadas-em-aco-inox-7-com-bainha-e-cabo-em-chifre-e-osso",
    "description": "Um conjunto completo para quem valoriza qualidade e tradição. Produzido em aço inox, com cabos em chifre e osso que garantem um visual único e sofisticado. Acompanha bainha e opção de personalização, sendo ideal para uso ou para presentear com estilo e exclusividade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-7-c-bainha.png"
    ]
  },
  {
    "id": 82,
    "name": "Copo Térmico em Aço Inox 473ml com Tampa Vedada para Bebidas Quentes e Geladas",
    "price": 47.9,
    "compareAtPrice": 67.06,
    "image": "/images/produtos/wb-copo-termico-de-473ml-em-inox-com-tampa-vedada-bebidas-quentes-ou-geladas-por-horas.png",
    "rating": 4.6,
    "reviews": 250,
    "category": "Copos e Térmicos",
    "slug": "copo-termico-em-aco-inox-473ml-com-tampa-vedada-para-bebidas-quentes-e-geladas",
    "description": "Durabilidade, estilo e eficiência. Mantém sua bebida gelada por horas, com design sofisticado e acabamento em aço inox escovado.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-copo-termico-de-473ml-em-inox-com-tampa-vedada-bebidas-quentes-ou-geladas-por-horas.png"
    ]
  },
  {
    "id": 83,
    "name": "Kit Completo para Caipirinha | Presente para Barman e Amantes de Drinks",
    "price": 47.9,
    "compareAtPrice": 63.61,
    "image": "/images/produtos/wb-kit-drink-completo-presente-caipirinha-barman.png",
    "rating": 4.8,
    "reviews": 51,
    "category": "Kits Gourmet",
    "slug": "kit-completo-para-caipirinha-presente-para-barman-e-amantes-de-drinks",
    "description": "Surpreenda com estilo! O presente perfeito para quem aprecia momentos únicos e brindes inesquecíveis. Elegância e sabor em uma só Experiência!!",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-drink-completo-presente-caipirinha-barman.png"
    ]
  },
  {
    "id": 84,
    "name": "Kit para Queijos e Petiscos com Tábua | Ideal para Presentear",
    "price": 45.9,
    "compareAtPrice": 64.26,
    "image": "/images/produtos/wb-kit-queijo-petiscaria-frios-c-tabua-p-presente.png",
    "rating": 5,
    "reviews": 92,
    "category": "Kits Gourmet",
    "slug": "kit-para-queijos-e-petiscos-com-tabua-ideal-para-presentear",
    "description": "O presente ideal para quem aprecia sabor e sofisticação. Nosso Kit de Queijos e Frios é perfeito para transformar qualquer momento em uma experiência inesquecível.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-queijo-petiscaria-frios-c-tabua-p-presente.png"
    ]
  },
  {
    "id": 85,
    "name": "Faca para Churrasco Personalizada em Inox e Madeira 7” sem Bainha",
    "price": 77.9,
    "compareAtPrice": 109.06,
    "image": "/images/produtos/wb-faca-p-churrasco-personalizada-inox-madeira-7-s-bainha.png",
    "rating": 4.7,
    "reviews": 133,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-em-inox-e-madeira-7-sem-bainha",
    "description": "Uma peça artesanal que une elegância, precisão e praticidade — perfeita para presentear quem valoriza o churrasco com estilo e personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-p-churrasco-personalizada-inox-madeira-7-s-bainha.png"
    ]
  },
  {
    "id": 86,
    "name": "Tábua de Churrasco Personalizada Damascus Design",
    "price": 46.9,
    "compareAtPrice": 62.2,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-damascus-design-c-garfo-tridente-e-petisco.png",
    "rating": 4.9,
    "reviews": 174,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-damascus-design",
    "description": "Algo que une elegância e funcionalidade, pensado para quem valoriza momentos únicos. Com um visual sofisticado e acabamento impecável, é a escolha certa para quem deseja surpreender com um presente de bom gosto e duradouro — seja em datas especiais ou para homenagear alguém apaixonado por churrasco.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-damascus-design-c-garfo-tridente-e-petisco.png"
    ]
  },
  {
    "id": 87,
    "name": "Kit para Vinho com 4 Peças e Suporte de Barril Decorativo",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/wb-kit-para-vinho-4pcs-c-supor-d.png",
    "rating": 4.6,
    "reviews": 215,
    "category": "Kits Gourmet",
    "slug": "kit-para-vinho-com-4-pecas-e-suporte-de-barril-decorativo",
    "description": "Compacto e criativo, este conjunto para vinho é perfeito para surpreender com estilo. Apresentado em um suporte em formato de barril, é o tipo de presente que encanta à primeira vista.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-para-vinho-4pcs-c-supor-d.png"
    ]
  },
  {
    "id": 88,
    "name": "Kit Whisky Presente com Baralho | Conjunto Completo",
    "price": 45.9,
    "compareAtPrice": 64.26,
    "image": "/images/produtos/wb-kit-whisky-com-baralho.png",
    "rating": 4.8,
    "reviews": 256,
    "category": "Kits Gourmet",
    "slug": "kit-whisky-presente-com-baralho-conjunto-completo",
    "description": "Kit Whisky Presente com Baralho | Conjunto Completo Um presente sofisticado para quem valoriza bons momentos. O kit combina whisky e entretenimento em uma proposta elegante e funcional, ideal para reunir amigos, relaxar e criar experiências memoráveis. Uma escolha original para presentear com estilo",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-whisky-com-baralho.png"
    ]
  },
  {
    "id": 89,
    "name": "Conjunto para Queijo Presente em Bambu e Inox | 3 Peças",
    "price": 48.9,
    "compareAtPrice": 68.46,
    "image": "/images/produtos/wb-conjunto-para-queijo-em-bambu-inox-3-pcs.png",
    "rating": 5,
    "reviews": 57,
    "category": "Kits Gourmet",
    "slug": "conjunto-para-queijo-presente-em-bambu-e-inox-3-pecas",
    "description": "Simplicidade e elegância reunidas em um conjunto ideal para momentos de degustação. Um presente prático, funcional e cheio de personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-conjunto-para-queijo-em-bambu-inox-3-pcs.png"
    ]
  },
  {
    "id": 90,
    "name": "Kit Queijo e Vinho Presente | 6 Peças em Bambu e Inox",
    "price": 56.9,
    "compareAtPrice": 75.17,
    "image": "/images/produtos/wb-kit-queijo-e-vinho-6-pcs.png",
    "rating": 4.7,
    "reviews": 98,
    "category": "Kits Gourmet",
    "slug": "kit-queijo-e-vinho-presente-6-pecas-em-bambu-e-inox",
    "description": "Um conjunto elegante que une o charme da degustação de queijos à celebração com vinhos. Ideal para presentear com sofisticação e criar momentos memoráveis.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-queijo-e-vinho-6-pcs.png"
    ]
  },
  {
    "id": 91,
    "name": "Kit Queijo e Vinho Presente Completo | 8 Peças",
    "price": 41.87,
    "compareAtPrice": 83.73,
    "image": "/images/produtos/wb-kit-para-queijo-e-vinho-8-pcs.png",
    "rating": 4.9,
    "reviews": 139,
    "category": "Kits Gourmet",
    "slug": "kit-queijo-e-vinho-presente-completo-8-pecas",
    "description": "Um conjunto sofisticado que une o charme da degustação de queijos à celebração com vinhos. Ideal para presentear com elegância e criar momentos memoráveis.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-para-queijo-e-vinho-8-pcs.png"
    ]
  },
  {
    "id": 92,
    "name": "Garrafa Térmica Parede Dupla com Detalhes em Bambu | 500ml Preta",
    "price": 27.02,
    "compareAtPrice": 180.03,
    "image": "/images/produtos/wb-garrafa-parede-dupla-com-detalhes-em-bambu-preta-500-ml.png",
    "rating": 4.6,
    "reviews": 180,
    "category": "Copos e Térmicos",
    "slug": "garrafa-termica-parede-dupla-com-detalhes-em-bambu-500ml-preta",
    "description": "Elegante e funcional, essa garrafa combina o visual moderno do metal com o toque natural do bambu. Uma escolha refinada para quem valoriza estilo e praticidade no dia a dia.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garrafa-parede-dupla-com-detalhes-em-bambu-preta-500-ml.png"
    ]
  },
  {
    "id": 93,
    "name": "Garrafa Térmica de Alumínio Preta | 1 Litro",
    "price": 34.9,
    "compareAtPrice": 48.86,
    "image": "/images/produtos/wb-garrafa-em-aluminio-preta-1-litro.png",
    "rating": 4.8,
    "reviews": 221,
    "category": "Copos e Térmicos",
    "slug": "garrafa-termica-de-aluminio-preta-1-litro",
    "description": "Design minimalista e robusto, ideal para acompanhar rotinas intensas com estilo. Um presente funcional que une leveza, praticidade e um toque natural.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garrafa-em-aluminio-preta-1-litro.png"
    ]
  },
  {
    "id": 94,
    "name": "Kit Queijo e Champagne Presente com Espaço para Garrafa | 7 Peças",
    "price": 51.9,
    "compareAtPrice": 68.64,
    "image": "/images/produtos/wb-kit-queijo-e-champagne-c-espaco-p-garrafa-7-pcs-nao-acompanha-garrafa.png",
    "rating": 5,
    "reviews": 262,
    "category": "Copos e Térmicos",
    "slug": "kit-queijo-e-champagne-presente-com-espaco-para-garrafa-7-pecas",
    "description": "Um conjunto sofisticado que une o charme da degustação de queijos à celebração com espumantes. Ideal para presentear com elegância e criar momentos memoráveis.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-queijo-e-champagne-c-espaco-p-garrafa-7-pcs-nao-acompanha-garrafa.png"
    ]
  },
  {
    "id": 95,
    "name": "Kit Queijo Presente em Bambu, Madeira e Inox | 5 Peças",
    "price": 33.89,
    "compareAtPrice": 225.91,
    "image": "/images/produtos/wb-kit-para-queijo-em-bambu-madeira-inox-5-pcs.png",
    "rating": 4.7,
    "reviews": 63,
    "category": "Kits Gourmet",
    "slug": "kit-queijo-presente-em-bambu-madeira-e-inox-5-pecas",
    "description": "Kit Queijo Presente em Bambu, Madeira e Inox | 5 Peças — produto premium para presente. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-para-queijo-em-bambu-madeira-inox-5-pcs.png"
    ]
  },
  {
    "id": 96,
    "name": "Kit Churrasco Presente em Bambu e Inox | 3 Peças",
    "price": 41.9,
    "compareAtPrice": 58.66,
    "image": "/images/produtos/wb-conj-para-churrasco-em-bambu-inox-madeira-3-pcs.png",
    "rating": 4.9,
    "reviews": 104,
    "category": "Kits de Presente",
    "slug": "kit-churrasco-presente-em-bambu-e-inox-3-pecas",
    "description": "Um conjunto elegante e funcional, ideal para transformar momentos de churrasco em experiências memoráveis. Perfeito para presentear com sofisticação e bom gosto.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-conj-para-churrasco-em-bambu-inox-madeira-3-pcs.png"
    ]
  },
  {
    "id": 97,
    "name": "Conjunto para Queijo Presente em Bambu e Inox | 5 Peças",
    "price": 54.9,
    "compareAtPrice": 72.62,
    "image": "/images/produtos/wb-conjunto-para-queijo-em-bambu-inox-5-pcs.png",
    "rating": 4.6,
    "reviews": 145,
    "category": "Kits Gourmet",
    "slug": "conjunto-para-queijo-presente-em-bambu-e-inox-5-pecas",
    "description": "Um conjunto elegante e funcional, ideal para transformar momentos de degustação em experiências memoráveis. Perfeito para presentear com sofisticação e bom gosto.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-conjunto-para-queijo-em-bambu-inox-5-pcs.png"
    ]
  },
  {
    "id": 98,
    "name": "Kit para Vinho com 5 Peças em Caixa de Bambu | Presente Elegante",
    "price": 47.9,
    "compareAtPrice": 67.06,
    "image": "/images/produtos/wb-kit-para-vinho-c-5pcs.png",
    "rating": 4.8,
    "reviews": 186,
    "category": "Kits Gourmet",
    "slug": "kit-para-vinho-com-5-pecas-em-caixa-de-bambu-presente-elegante",
    "description": "Um presente sofisticado e funcional, perfeito para quem aprecia um bom vinho. Cada item do conjunto foi pensado para tornar a experiência ainda mais elegante e completa.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-para-vinho-c-5pcs.png"
    ]
  },
  {
    "id": 99,
    "name": "Kit Queijo 3 Peças | Suporte em Madeira e Aço Inox para Degustação",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/wb-jg-de-3-itens-p-queijo-supor.png",
    "rating": 5,
    "reviews": 227,
    "category": "Petisqueiras",
    "slug": "kit-queijo-3-pecas-suporte-em-madeira-e-aco-inox-para-degustacao",
    "description": "Conjunto funcional para servir e cortar queijos com estilo. Suporte em madeira e peças em aço inox combinam praticidade e design para momentos gourmet.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-jg-de-3-itens-p-queijo-supor.png"
    ]
  },
  {
    "id": 100,
    "name": "Tábua de Madeira com Chapa de Ferro Fundido e 2 Molheiras para Servir",
    "price": 45.9,
    "compareAtPrice": 64.26,
    "image": "/images/produtos/wb-tabua-de-madeira-com-chapa-de-ferro-fundido-e-2-molheiras.png",
    "rating": 4.7,
    "reviews": 268,
    "category": "Tábuas",
    "slug": "tabua-de-madeira-com-chapa-de-ferro-fundido-e-2-molheiras-para-servir",
    "description": "Existem presentes que encantam à primeira vista e marcam para sempre. Combinando rusticidade e sofisticação, essa peça transforma cada refeição em um momento especial, celebrando os laços que unem as pessoas.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-madeira-com-chapa-de-ferro-fundido-e-2-molheiras.png"
    ]
  },
  {
    "id": 101,
    "name": "Tábua de Madeira Nobre 30 x 30 cm com Chapa de Ferro Fundido 22 x 22 cm",
    "price": 39.9,
    "compareAtPrice": 55.86,
    "image": "/images/produtos/wb-tabua-de-madeira-nobre-com-chapa-de-ferro-max-30-x-30-cm.png",
    "rating": 4.9,
    "reviews": 69,
    "category": "Tábuas",
    "slug": "tabua-de-madeira-nobre-30-x-30-cm-com-chapa-de-ferro-fundido-22-x-22-cm",
    "description": "Mais do que um item funcional, é um convite para criar memórias ao redor da mesa. Uma peça que traduz afeto, bom gosto e atenção aos detalhes, perfeita para quem merece um presente à altura dos grandes momentos.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-madeira-nobre-com-chapa-de-ferro-max-30-x-30-cm.png"
    ]
  },
  {
    "id": 102,
    "name": "Caixa Para Presente Personalizada Madeira MDF 30x30x5 cm",
    "price": 37.9,
    "compareAtPrice": 53.06,
    "image": "/images/produtos/wb-caixa-para-presente-personalizada-madeira-mdf-30x30x7-cm.png",
    "rating": 4.6,
    "reviews": 110,
    "category": "Kits de Presente",
    "slug": "caixa-para-presente-personalizada-madeira-mdf-30x30x5-cm",
    "description": "Uma embalagem que transforma o ato de presentear em uma experiência memorável. Ideal para valorizar ainda mais o conteúdo, seja ele qual for.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-caixa-para-presente-personalizada-madeira-mdf-30x30x7-cm.png"
    ]
  },
  {
    "id": 103,
    "name": "Tábua de Carne Rústica Artesanal Personalizada | Presente Especial",
    "price": 49.9,
    "compareAtPrice": 69.86,
    "image": "/images/produtos/wb-tabua-de-carne-rustica-personalizada-artesanal-presente.png",
    "rating": 4.8,
    "reviews": 151,
    "category": "Tábuas",
    "slug": "tabua-de-carne-rustica-artesanal-personalizada-presente-especial",
    "description": "Presenteie com personalidade e bom gosto. Uma tábua artesanal que une rusticidade, elegância e funcionalidade, perfeita para surpreender alguém especial ou elevar a sua experiência na cozinha.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-carne-rustica-personalizada-artesanal-presente.png"
    ]
  },
  {
    "id": 104,
    "name": "Petisqueira em Formato de Coração com Molheira e 5 Divisões | Presente Romântico",
    "price": 31.9,
    "compareAtPrice": 44.66,
    "image": "/images/produtos/wb-petisqueira-coracao-com-molheira-5-divisoes-presente-namorado.png",
    "rating": 5,
    "reviews": 192,
    "category": "Petisqueiras",
    "slug": "petisqueira-em-formato-de-coracao-com-molheira-e-5-divisoes-presente-romantico",
    "description": "Delicada e cheia de significado, esta peça une beleza e afeto em um só gesto. Com design envolvente e acabamento refinado, transforma qualquer ocasião em uma oportunidade de demonstrar carinho. Um presente que marca pela estética e pelo simbolismo.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-petisqueira-coracao-com-molheira-5-divisoes-presente-namorado.png"
    ]
  },
  {
    "id": 105,
    "name": "Caixa Para Presente Personalizada Madeira MDF 40 x 40 x 7cm",
    "price": 37.9,
    "compareAtPrice": 53.06,
    "image": "/images/produtos/wb-caixa-para-presente-personalizada-madeira-mdf-43-x-43-x-85cm.png",
    "rating": 4.7,
    "reviews": 233,
    "category": "Kits de Presente",
    "slug": "caixa-para-presente-personalizada-madeira-mdf-40-x-40-x-7cm",
    "description": "Com presença marcante e acabamento impecável, esta caixa transforma o ato de presentear em uma experiência completa. Mais do que uma embalagem, é parte do presente. Um toque de sofisticação que revela cuidado em cada detalhe.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-caixa-para-presente-personalizada-madeira-mdf-43-x-43-x-85cm.png"
    ]
  },
  {
    "id": 106,
    "name": "Tábua de Corte em Madeira Teca 37 x 28 cm",
    "price": 46.9,
    "compareAtPrice": 65.66,
    "image": "/images/produtos/wb-tabua-de-corte-em-madeira-nobre-macica-37-x-28-cm.png",
    "rating": 4.9,
    "reviews": 274,
    "category": "Tábuas",
    "slug": "tabua-de-corte-em-madeira-teca-37-x-28-cm",
    "description": "Criada para transformar momentos simples em gestos memoráveis, esta peça combina beleza natural e sofisticação em cada detalhe. Seu design robusto e elegante faz dela uma escolha à altura de quem deseja impressionar e emocionar com um presente que carrega autenticidade, utilidade e bom gosto.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-corte-em-madeira-nobre-macica-37-x-28-cm.png"
    ]
  },
  {
    "id": 107,
    "name": "Petisqueira em Madeira Nobre c/ 4 Garfos Petiscos",
    "price": 41.9,
    "compareAtPrice": 58.66,
    "image": "/images/produtos/wb-petisqueira-em-madeira-nobre-c-4-garfos-petiscos.png",
    "rating": 4.6,
    "reviews": 75,
    "category": "Petisqueiras",
    "slug": "petisqueira-em-madeira-nobre-c-4-garfos-petiscos",
    "description": "Perfeita para presentear com charme e significado, esta peça reúne elegância, funcionalidade e um toque de rusticidade. Ideal para quem valoriza momentos compartilhados, ela transforma qualquer reunião em uma celebração especial, despertando emoções através da estética e do cuidado nos detalhes.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-petisqueira-em-madeira-nobre-c-4-garfos-petiscos.png"
    ]
  },
  {
    "id": 108,
    "name": "Kit Garfo Tridente + Garra de Urso 10 Garfos Petisco Churras",
    "price": 40.49,
    "compareAtPrice": 53.98,
    "image": "/images/produtos/wb-kit-garfo-tridente-garra-de-urso-10-garfos-petisco-churras.png",
    "rating": 4.8,
    "reviews": 116,
    "category": "Garfos e Garras",
    "slug": "kit-garfo-tridente-garra-de-urso-10-garfos-petisco-churras",
    "description": "Mais que um presente, este kit representa presença, conexão e momentos inesquecíveis ao redor da mesa. Ideal para quem valoriza o ritual do churrasco com personalidade, ele surpreende desde o primeiro olhar e torna-se símbolo de apreço e celebração.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-garfo-tridente-garra-de-urso-10-garfos-petisco-churras.png"
    ]
  },
  {
    "id": 109,
    "name": "Tábua de Corte Rústica em Madeira Nobre Churrasco 40x26 cm",
    "price": 36.15,
    "compareAtPrice": 48.19,
    "image": "/images/produtos/wb-tabua-de-corte-rustica-em-madeira-nobre-churrasco-40x275-cm.png",
    "rating": 5,
    "reviews": 157,
    "category": "Tábuas",
    "slug": "tabua-de-corte-rustica-em-madeira-nobre-churrasco-40x26-cm",
    "description": "Tábua de Corte Rústica em Madeira Nobre Churrasco 40x26 cm — produto premium para presente. Entrega para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-corte-rustica-em-madeira-nobre-churrasco-40x275-cm.png"
    ]
  },
  {
    "id": 110,
    "name": "Petisqueira em Madeira Nobre para Petiscos, Frios e Queijos",
    "price": 48.9,
    "compareAtPrice": 68.46,
    "image": "/images/produtos/wb-petisqueira-madeira-nobre-p-petiscos-frios-queijo-churrasco.png",
    "rating": 4.7,
    "reviews": 198,
    "category": "Petisqueiras",
    "slug": "petisqueira-em-madeira-nobre-para-petiscos-frios-e-queijos",
    "description": "Pensada para transformar encontros em momentos especiais, esta peça une funcionalidade e elegância em cada traço. Uma escolha certeira para quem deseja presentear com algo autêntico, útil e cheio de personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-petisqueira-madeira-nobre-p-petiscos-frios-queijo-churrasco.png"
    ]
  },
  {
    "id": 111,
    "name": "Petisqueira Redonda Madeira Teca 5 Divisórias Frios Churras",
    "price": 40.9,
    "compareAtPrice": 57.26,
    "image": "/images/produtos/wb-petisqueira-redonda-madeira-teca-5-divisorias-frios-churras.png",
    "rating": 4.9,
    "reviews": 239,
    "category": "Petisqueiras",
    "slug": "petisqueira-redonda-madeira-teca-5-divisorias-frios-churras",
    "description": "Elegante e funcional, esta peça foi criada para transformar encontros em momentos memoráveis. Ideal para presentear com autenticidade, ela combina design refinado e praticidade, tornando-se um destaque em qualquer ocasião.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-petisqueira-redonda-madeira-teca-5-divisorias-frios-churras.png"
    ]
  },
  {
    "id": 112,
    "name": "Faca para Churrasco Personalizada Inox Artesanal Cabo Madeira 7″ c/ Bainha",
    "price": 26.99,
    "compareAtPrice": 179.9,
    "image": "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-madeira-7-c-bainha.png",
    "rating": 4.6,
    "reviews": 280,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-inox-artesanal-cabo-madeira-7-c-bainha",
    "description": "Uma peça feita para surpreender, com presença marcante e detalhes que encantam ao toque e ao olhar. Um presente de personalidade, ideal para quem valoriza momentos especiais ao redor do fogo e da mesa.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-madeira-7-c-bainha.png"
    ]
  },
  {
    "id": 113,
    "name": "Caixa Presente Preta Quadrada",
    "price": 35.9,
    "compareAtPrice": 50.26,
    "image": "/images/produtos/caixa-presente-preta-quadrada.png",
    "rating": 4.8,
    "reviews": 81,
    "category": "Kits de Presente",
    "slug": "caixa-presente-preta-quadrada",
    "description": "Elegante, minimalista e impactante: uma escolha refinada para valorizar qualquer presente. Perfeita para transformar gestos simples em memórias inesquecíveis.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/caixa-presente-preta-quadrada.png"
    ]
  },
  {
    "id": 114,
    "name": "Caixa de MDF Personalizada para Faca 42x9x5cm para Presente",
    "price": 32.9,
    "compareAtPrice": 46.06,
    "image": "/images/produtos/wb-caixa-mdf-para-faca-42x9x5cm-mdf-6mm-personalizada-para-presente.png",
    "rating": 5,
    "reviews": 122,
    "category": "Kits de Presente",
    "slug": "caixa-de-mdf-personalizada-para-faca-42x9x5cm-para-presente",
    "description": "Mais que uma embalagem, uma extensão do presente. Com design rústico e acabamento personalizado, transforma qualquer item em um gesto inesquecível.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-caixa-mdf-para-faca-42x9x5cm-mdf-6mm-personalizada-para-presente.png"
    ]
  },
  {
    "id": 115,
    "name": "Tábua Para Servir Personalizada",
    "price": 67.9,
    "compareAtPrice": 95.06,
    "image": "/images/produtos/wb-tabua-para-servir-personalizada.png",
    "rating": 4.7,
    "reviews": 163,
    "category": "Tábuas",
    "slug": "tabua-para-servir-personalizada",
    "description": "Presente que encanta pela utilidade e impressiona pelo design. Um item pensado para servir bons momentos à mesa, com presença marcante e toque emocional em cada detalhe.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-para-servir-personalizada.png"
    ]
  },
  {
    "id": 116,
    "name": "Caixa de Presente Premium Preta | Embalagem Elegante para Kits e Presentes",
    "price": 35.9,
    "compareAtPrice": 50.26,
    "image": "/images/produtos/caixa-de-presente-premium-preta-embalagem-elegante-para-kits-e-presentes.webp",
    "rating": 4.9,
    "reviews": 204,
    "category": "Kits de Presente",
    "slug": "caixa-de-presente-premium-preta-embalagem-elegante-para-kits-e-presentes",
    "description": "Caixa de presente premium preta com estrutura rígida e acabamento fosco sofisticado. Ideal para montar kits personalizados e valorizar qualquer presente com uma apresentação elegante e marcante.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/caixa-de-presente-premium-preta-embalagem-elegante-para-kits-e-presentes.webp"
    ]
  },
  {
    "id": 117,
    "name": "Garra de Urso Alumínio Polida Premium Personalizada Presente",
    "price": 46.9,
    "compareAtPrice": 65.66,
    "image": "/images/produtos/garra-de-urso-aluminio-polida-premium-personalizada-presente.png",
    "rating": 4.6,
    "reviews": 245,
    "category": "Garfos e Garras",
    "slug": "garra-de-urso-aluminio-polida-premium-personalizada-presente",
    "description": "Um presente imponente e funcional, ideal para quem valoriza autenticidade, estilo e momentos marcantes à mesa. Criada para impressionar desde o primeiro toque.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/garra-de-urso-aluminio-polida-premium-personalizada-presente.png"
    ]
  },
  {
    "id": 118,
    "name": "Tábua de Churrasco Personalizada Churrasqueiro Oficial da Família",
    "price": 49.9,
    "compareAtPrice": 69.86,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-churrasqueiro-oficial-da-familia.png",
    "rating": 4.8,
    "reviews": 46,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-churrasqueiro-oficial-da-familia",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, esta tábua transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-churrasqueiro-oficial-da-familia.png"
    ]
  },
  {
    "id": 119,
    "name": "Faca para Churrasco Personalizada Inox Artesanal Cabo Chifre Chifre Osso 7\" c/ Bainha",
    "price": 25.07,
    "compareAtPrice": 167.11,
    "image": "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-chifre-chifre-osso-7-c-bainha.png",
    "rating": 5,
    "reviews": 87,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-inox-artesanal-cabo-chifre-chifre-osso-7-c-bainha",
    "description": "Um presente marcante, que traduz tradição, força e estilo em cada detalhe. Perfeita para quem valoriza momentos autênticos ao redor da brasa e merece algo verdadeiramente único.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-chifre-chifre-osso-7-c-bainha.png"
    ]
  },
  {
    "id": 120,
    "name": "Faca para Churrasco Personalizada Inox Artesanal Chifre Madeira 8\" c/ Bainha",
    "price": 35.3,
    "compareAtPrice": 47.06,
    "image": "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-chifre-madeira-8-c-bainha.png",
    "rating": 4.7,
    "reviews": 128,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-inox-artesanal-chifre-madeira-8-c-bainha",
    "description": "Uma peça imponente e cheia de significado, feita para quem leva o churrasco a sério. O presente perfeito para transformar um momento especial em uma lembrança inesquecível.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-chifre-madeira-8-c-bainha.png"
    ]
  },
  {
    "id": 121,
    "name": "Tábua de Churrasco Personalizada Traditional Bbq Black",
    "price": 34.24,
    "compareAtPrice": 45.65,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-traditional-bbq-black.png",
    "rating": 4.9,
    "reviews": 169,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-traditional-bbq-black",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, esta tábua transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-traditional-bbq-black.png"
    ]
  },
  {
    "id": 122,
    "name": "Tábua de Churrasco Personalizada Rústica Origens",
    "price": 38.99,
    "compareAtPrice": 51.98,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-rustica-origens.png",
    "rating": 4.6,
    "reviews": 210,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-rustica-origens",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, esta tábua transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-rustica-origens.png"
    ]
  },
  {
    "id": 123,
    "name": "Tábua de Churrasco Personalizada Life Bbq",
    "price": 57.9,
    "compareAtPrice": 81.06,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-life-bbq.png",
    "rating": 4.8,
    "reviews": 251,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-life-bbq",
    "description": "Um presente que une funcionalidade e sofisticação, ideal para celebrar momentos especiais ao redor da brasa. Com design exclusivo e detalhes artesanais, esta tábua transforma qualquer ocasião em uma experiência memorável.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-life-bbq.png"
    ]
  },
  {
    "id": 124,
    "name": "Tábua de Churrasco Personalizada Bbq Masters + Garra de Urso",
    "price": 52.9,
    "compareAtPrice": 69.56,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-bbq-masters.png",
    "rating": 5,
    "reviews": 52,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-bbq-masters-garra-de-urso",
    "description": "Para quem leva o churrasco a sério, esta combinação une robustez, estilo e funcionalidade. Um presente que impressiona pela presença e pela utilidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-bbq-masters.png"
    ]
  },
  {
    "id": 125,
    "name": "Tábua de Churrasco Personalizada Life Bbq Supreme",
    "price": 67.9,
    "compareAtPrice": 95.06,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-life-bbq-supreme.png",
    "rating": 4.7,
    "reviews": 93,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-life-bbq-supreme",
    "description": "Para quem valoriza tradição e estilo no preparo do churrasco, esta tábua une elegância e funcionalidade, tornando cada momento ao redor da churrasqueira ainda mais especial.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-life-bbq-supreme.png"
    ]
  },
  {
    "id": 126,
    "name": "Garfo Tridente para Churrasco Personalizado Alumínio",
    "price": 43.9,
    "compareAtPrice": 61.46,
    "image": "/images/produtos/wb-garfo-tridente-para-churrasco-personalizado-aluminio.png",
    "rating": 4.9,
    "reviews": 134,
    "category": "Garfos e Garras",
    "slug": "garfo-tridente-para-churrasco-personalizado-aluminio",
    "description": "Presenteie com estilo e utilidade. Este garfo tridente é uma escolha marcante para quem valoriza acessórios robustos e personalizados no churrasco — ideal para impressionar em ocasiões especiais.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garfo-tridente-para-churrasco-personalizado-aluminio.png"
    ]
  },
  {
    "id": 127,
    "name": "Garfo Tridente Churrasco Personalizado Moedor Já Com Sal",
    "price": 72.9,
    "compareAtPrice": 102.06,
    "image": "/images/produtos/wb-garfo-tridente-churrasco-personalizado-c-moedor-de-temperos-personalizado.png",
    "rating": 4.6,
    "reviews": 175,
    "category": "Garfos e Garras",
    "slug": "garfo-tridente-churrasco-personalizado-moedor-ja-com-sal",
    "description": "Um presente criativo que une praticidade e estilo. Este garfo tridente personalizado traz um moedor integrado com sal, tornando o momento do churrasco ainda mais prático e cheio de personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garfo-tridente-churrasco-personalizado-c-moedor-de-temperos-personalizado.png"
    ]
  },
  {
    "id": 128,
    "name": "Garra de Urso Churrasco Alumínio Personalizada",
    "price": 51.9,
    "compareAtPrice": 72.66,
    "image": "/images/produtos/wb-garra-de-urso-churrasco-aluminio-personalizada.png",
    "rating": 4.8,
    "reviews": 216,
    "category": "Garfos e Garras",
    "slug": "garra-de-urso-churrasco-aluminio-personalizada",
    "description": "Surpreenda com um presente imponente e funcional. A garra de urso é o acessório perfeito para quem leva o momento a sério. Prática, resistente e cheia de personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garra-de-urso-churrasco-aluminio-personalizada.png"
    ]
  },
  {
    "id": 129,
    "name": "Garfo Tridente Churrasco c/ Garra de Urso Alumínio Personalizado",
    "price": 59.9,
    "compareAtPrice": 83.86,
    "image": "/images/produtos/wb-garfo-tridente-churrasco-c-garra-de-urso-aluminio-personalizado.png",
    "rating": 5,
    "reviews": 257,
    "category": "Garfos e Garras",
    "slug": "garfo-tridente-churrasco-c-garra-de-urso-aluminio-personalizado",
    "description": "Um presente impactante e funcional para quem valoriza cada detalhe do seu momento. O conjunto com garfo tridente e garra de urso em alumínio entrega força, estilo e praticidade em uma combinação única.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garfo-tridente-churrasco-c-garra-de-urso-aluminio-personalizado.png"
    ]
  },
  {
    "id": 130,
    "name": "Kit Petisco e Churrasco Personalizado c/ 10 Garfos Alumínio Touro",
    "price": 88.9,
    "compareAtPrice": 124.46,
    "image": "/images/produtos/wb-kit-petisco-e-churrasco-personalizado-c-10-garfos-zamac-touro.png",
    "rating": 4.7,
    "reviews": 58,
    "category": "Garfos e Garras",
    "slug": "kit-petisco-e-churrasco-personalizado-c-10-garfos-aluminio-touro",
    "description": "Um presente forte, marcante e funcional. Este kit une design imponente e praticidade, com 10 garfos de alumínio personalizados no modelo Touro. Ideal para quem ama servir com estilo e personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-kit-petisco-e-churrasco-personalizado-c-10-garfos-zamac-touro.png"
    ]
  },
  {
    "id": 131,
    "name": "Garfo Tridente Churrasco 10 Garfos para Petisco Premium Personalizado",
    "price": 31.49,
    "compareAtPrice": 209.9,
    "image": "/images/produtos/wb-garfo-tridente-churrasco-10-garfos-para-petisco-premium-personalizado.png",
    "rating": 4.9,
    "reviews": 99,
    "category": "Garfos e Garras",
    "slug": "garfo-tridente-churrasco-10-garfos-para-petisco-premium-personalizado",
    "description": "Para presentear com elegância e funcionalidade. Este conjunto une o clássico garfo tridente com 10 garfinhos de petisco premium, oferecendo praticidade e um toque especial à mesa ou ao churrasco.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-garfo-tridente-churrasco-10-garfos-para-petisco-premium-personalizado.png"
    ]
  },
  {
    "id": 132,
    "name": "Faca e Chaira para Churrasco Personalizada Inox Artesanal Cabo Madeira 8” c/ Bainha",
    "price": 46.9,
    "compareAtPrice": 61.58,
    "image": "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-madeira-8-c-bainha.png",
    "rating": 4.6,
    "reviews": 140,
    "category": "Facas",
    "slug": "faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-madeira-8-c-bainha",
    "description": "Presenteie com tradição e utilidade. Esse conjunto artesanal oferece equilíbrio entre estilo, desempenho e significado. Ideal para quem valoriza momentos especiais em volta da grelha.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-madeira-8-c-bainha.png"
    ]
  },
  {
    "id": 133,
    "name": "Faca para Churrasco Personalizada Inox Artesanal Cabo Chifre c/ Bainha 8''",
    "price": 47.9,
    "compareAtPrice": 63.78,
    "image": "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-chifre-c-bainha-8-2.png",
    "rating": 4.8,
    "reviews": 181,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-inox-artesanal-cabo-chifre-c-bainha-8",
    "description": "Faca em aço inox AISI 420 com lâmina de 8”, cabo de chifre torneado e bainha em couro. Uma peça resistente, elegante e funcional, ideal para churrasco, cozinha ou presente.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-chifre-c-bainha-8-2.png"
    ]
  },
  {
    "id": 134,
    "name": "Chaira Inox Cabo Chifre Torneado 7\"",
    "price": 43.9,
    "compareAtPrice": 61.46,
    "image": "/images/produtos/wb-chaira-inox-cabo-chifre-torneado-10.png",
    "rating": 5,
    "reviews": 222,
    "category": "Facas",
    "slug": "chaira-inox-cabo-chifre-torneado-7",
    "description": "Um presente funcional e cheio de estilo. Essa chaira artesanal é perfeita para quem valoriza cuidado com os detalhes e gosta de manter suas facas sempre afiadas. Com charme e tradição.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-chaira-inox-cabo-chifre-torneado-10.png"
    ]
  },
  {
    "id": 135,
    "name": "Faca para Churrasco Personalizada Inox Artesanal Cabo Madeira Osso 10\" c/ Bainha",
    "price": 35.69,
    "compareAtPrice": 47.58,
    "image": "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-madeira-osso-10-c-bainha.png",
    "rating": 4.7,
    "reviews": 263,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-inox-artesanal-cabo-madeira-osso-10-c-bainha",
    "description": "Mais do que uma faca: um presente que transmite personalidade, bom gosto e apreço por momentos especiais. Ideal para quem valoriza peças artesanais e experiências inesquecíveis à mesa.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-madeira-osso-10-c-bainha.png"
    ]
  },
  {
    "id": 136,
    "name": "Faca para Churrasco Personalizada Inox Cabo Chifre 7\" Bainha",
    "price": 31.34,
    "compareAtPrice": 208.89,
    "image": "/images/produtos/wb-faca-para-churrasco-personalizada-inox-cabo-chifre-8-bainha.png",
    "rating": 4.9,
    "reviews": 64,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-inox-cabo-chifre-7-bainha",
    "description": "Um presente elegante e cheio de personalidade. Ideal para quem valoriza peças únicas e momentos especiais à mesa, essa faca artesanal transforma o simples ato de servir em uma experiência marcante.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-personalizada-inox-cabo-chifre-8-bainha.png"
    ]
  },
  {
    "id": 137,
    "name": "Faca para Churrasco Inox Artesanal Cabo Chifre Torneado 8\" c/ Bainha",
    "price": 47.9,
    "compareAtPrice": 63.78,
    "image": "/images/produtos/wb-faca-para-churrasco-inox-artesanal-cabo-chifre-torneado-8-c-bainha.png",
    "rating": 4.6,
    "reviews": 105,
    "category": "Facas",
    "slug": "faca-para-churrasco-inox-artesanal-cabo-chifre-torneado-8-c-bainha",
    "description": "Uma escolha imponente para presentear com estilo. Esta faca artesanal traduz cuidado e personalidade em cada detalhe. Perfeita para surpreender quem valoriza momentos especiais ao redor da grelha.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-inox-artesanal-cabo-chifre-torneado-8-c-bainha.png"
    ]
  },
  {
    "id": 138,
    "name": "Faca para Churrasco Personalizada Inox Artesanal Cabo Osso Chifre 8\" c/ Bainha",
    "price": 35.3,
    "compareAtPrice": 47.06,
    "image": "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-osso-chifre-8-c-bainha.png",
    "rating": 4.8,
    "reviews": 146,
    "category": "Facas",
    "slug": "faca-para-churrasco-personalizada-inox-artesanal-cabo-osso-chifre-8-c-bainha",
    "description": "Presenteie com autenticidade. Esta faca artesanal é perfeita para surpreender quem valoriza tradição, estilo e momentos bem vividos à mesa. Uma peça marcante que vai além da função: carrega história e personalidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-para-churrasco-personalizada-inox-artesanal-cabo-osso-chifre-8-c-bainha.png"
    ]
  },
  {
    "id": 139,
    "name": "Amolador Afiador de Lâminas Facas Tesouras Portátil",
    "price": 32.9,
    "compareAtPrice": 46.06,
    "image": "/images/produtos/wb-amolador-afiador-de-laminas-facas-tesouras-portatil.webp",
    "rating": 5,
    "reviews": 187,
    "category": "Facas",
    "slug": "amolador-afiador-de-laminas-facas-tesouras-portatil",
    "description": "Um presente útil e inteligente para quem valoriza praticidade na cozinha. Com design compacto e eficiente, é ideal para manter facas e tesouras sempre afiadas, elevando o cuidado com cada preparo.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-amolador-afiador-de-laminas-facas-tesouras-portatil.webp"
    ]
  },
  {
    "id": 140,
    "name": "Faca e Chaira Para Churrasco Personalizada Inox Osso e Chifre 8\" C/ Bainha",
    "price": 39.99,
    "compareAtPrice": 79.98,
    "image": "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-osso-e-chifre-8-c-bainha.png",
    "rating": 4.7,
    "reviews": 228,
    "category": "Facas",
    "slug": "faca-e-chaira-para-churrasco-personalizada-inox-osso-e-chifre-8-c-bainha",
    "description": "Uma escolha de presente que impressiona pela beleza e pelo cuidado nos detalhes. Com design artesanal e visual rústico refinado, este conjunto é perfeito para quem valoriza momentos especiais à mesa com personalidade e bom gosto.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-osso-e-chifre-8-c-bainha.png"
    ]
  },
  {
    "id": 141,
    "name": "Faca e Chaira para Churrasco Personalizada Inox Artesanal Cabo em Chifre 7'' c/ Bainha",
    "price": 52.9,
    "compareAtPrice": 69.58,
    "image": "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-chifre-torneado-8-c-bainha.png",
    "rating": 4.9,
    "reviews": 269,
    "category": "Facas",
    "slug": "faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-em-chifre-7-c-bainha",
    "description": "Faca e chaira artesanal em aço inox com cabo torneado em chifre natural — combinação de precisão, resistência e elegância para elevar o ritual do churrasco.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-chifre-torneado-8-c-bainha.png"
    ]
  },
  {
    "id": 142,
    "name": "Faca e Chaira para Churrasco Personalizada Inox Artesanal Cabo Osso Madeira 8\" c/ Bainha",
    "price": 42.79,
    "compareAtPrice": 85.58,
    "image": "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-osso-madeira-8-c-bainha.png",
    "rating": 4.6,
    "reviews": 70,
    "category": "Facas",
    "slug": "faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-osso-madeira-8-c-bainha",
    "description": "Um presente que une tradição e sofisticação. Este conjunto artesanal é ideal para surpreender em ocasiões especiais, oferecendo uma experiência única para quem aprecia momentos à mesa com estilo e autenticidade.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-faca-e-chaira-para-churrasco-personalizada-inox-artesanal-cabo-osso-madeira-8-c-bainha.png"
    ]
  },
  {
    "id": 143,
    "name": "Petisqueira c/ 3 Divisões em Madeira Teca Petiscos e Frios",
    "price": 40.9,
    "compareAtPrice": 57.26,
    "image": "/images/produtos/wb-petisqueira-c-3-divisoes-em-madeira-nobre-petiscos-e-frios.png",
    "rating": 4.8,
    "reviews": 111,
    "category": "Petisqueiras",
    "slug": "petisqueira-c-3-divisoes-em-madeira-teca-petiscos-e-frios",
    "description": "Petisqueira com 3 divisões para organizar frios, queijos e petiscos com estilo. Ideal para jantares e encontros especiais.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-petisqueira-c-3-divisoes-em-madeira-nobre-petiscos-e-frios.png"
    ]
  },
  {
    "id": 144,
    "name": "Tábua de Churrasco Personalizada Rústica Artesanal Origens Black",
    "price": 31.19,
    "compareAtPrice": 207.92,
    "image": "/images/produtos/wb-tabua-de-churrasco-personalizada-rustica-artesanal-origens-black.png",
    "rating": 5,
    "reviews": 152,
    "category": "Tábuas",
    "slug": "tabua-de-churrasco-personalizada-rustica-artesanal-origens-black",
    "description": "Uma peça artesanal que combina rusticidade e sofisticação, ideal para quem aprecia momentos especiais à mesa. Seu design exclusivo e acabamento impecável tornam-na uma escolha perfeita para presentear em ocasiões marcantes, proporcionando um toque de elegância e funcionalidade ao churrasco.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/wb-tabua-de-churrasco-personalizada-rustica-artesanal-origens-black.png"
    ]
  },
  {
    "id": 145,
    "name": "Forno de Pizza Pequeno em Inox para Churrasqueira",
    "price": 44.99,
    "compareAtPrice": 89.98,
    "image": "/images/produtos/ig-forno-de-pizza-pequeno-em-inox-para-churrasqueira.jpg",
    "rating": 4.8,
    "reviews": 79,
    "category": "Forno de Pizza e Pás",
    "slug": "forno-de-pizza-pequeno-em-inox-para-churrasqueira",
    "description": "Forno de Pizza Pequeno em Inox para Churrasqueira em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-forno-de-pizza-pequeno-em-inox-para-churrasqueira.jpg"
    ]
  },
  {
    "id": 146,
    "name": "Forno de Pizza Médio em Inox para Churrasqueira",
    "price": 54.9,
    "compareAtPrice": 109.98,
    "image": "/images/produtos/ig-forno-de-pizza-medio-em-inox-para-churrasqueira.jpg",
    "rating": 5,
    "reviews": 120,
    "category": "Forno de Pizza e Pás",
    "slug": "forno-de-pizza-medio-em-inox-para-churrasqueira",
    "description": "Forno de Pizza Médio em Inox para Churrasqueira em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-forno-de-pizza-medio-em-inox-para-churrasqueira.jpg"
    ]
  },
  {
    "id": 147,
    "name": "Forno de Pizza Grande em Inox para Churrasqueira",
    "price": 59.9,
    "compareAtPrice": 119.98,
    "image": "/images/produtos/ig-forno-de-pizza-grande-em-inox-para-churrasqueira.jpg",
    "rating": 4.7,
    "reviews": 161,
    "category": "Forno de Pizza e Pás",
    "slug": "forno-de-pizza-grande-em-inox-para-churrasqueira",
    "description": "Forno de Pizza Grande em Inox para Churrasqueira em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-forno-de-pizza-grande-em-inox-para-churrasqueira.jpg"
    ]
  },
  {
    "id": 148,
    "name": "Grill Giratório Inox 3 Espetos Churrasqueiras Pré Moldada",
    "price": 49.9,
    "compareAtPrice": 99.98,
    "image": "/images/produtos/ig-grill-giratorio-inox-3-espetos-churrasqueiras-pre-moldada.jpg",
    "rating": 4.9,
    "reviews": 202,
    "category": "Churrasqueiras",
    "slug": "grill-giratorio-inox-3-espetos-churrasqueiras-pre-moldada",
    "description": "Grill Giratório Inox 3 Espetos Churrasqueiras Pré Moldada em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grill-giratorio-inox-3-espetos-churrasqueiras-pre-moldada.jpg"
    ]
  },
  {
    "id": 149,
    "name": "Grill Giratório Inox 4 Espetos Churrasqueiras Pré Moldada",
    "price": 54.9,
    "compareAtPrice": 109.98,
    "image": "/images/produtos/ig-grill-giratorio-inox-4-espetos-churrasqueiras-pre-moldada.jpg",
    "rating": 4.6,
    "reviews": 243,
    "category": "Churrasqueiras",
    "slug": "grill-giratorio-inox-4-espetos-churrasqueiras-pre-moldada",
    "description": "Grill Giratório Inox 4 Espetos Churrasqueiras Pré Moldada em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grill-giratorio-inox-4-espetos-churrasqueiras-pre-moldada.jpg"
    ]
  },
  {
    "id": 150,
    "name": "Grill Giratório Inox 5 Espetos Churrasqueiras Pré Moldada",
    "price": 59.9,
    "compareAtPrice": 119.98,
    "image": "/images/produtos/ig-grill-giratorio-inox-5-espetos-churrasqueiras-pre-moldada.jpg",
    "rating": 4.8,
    "reviews": 44,
    "category": "Churrasqueiras",
    "slug": "grill-giratorio-inox-5-espetos-churrasqueiras-pre-moldada",
    "description": "Grill Giratório Inox 5 Espetos Churrasqueiras Pré Moldada em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grill-giratorio-inox-5-espetos-churrasqueiras-pre-moldada.jpg"
    ]
  },
  {
    "id": 151,
    "name": "Suporte 3 Espetos Inox Churrasqueira Alvenaria",
    "price": 34.49,
    "compareAtPrice": 45.98,
    "image": "/images/produtos/ig-suporte-3-espetos-inox-churrasqueira-alvenaria.jpg",
    "rating": 5,
    "reviews": 85,
    "category": "Suportes para Espeto",
    "slug": "suporte-3-espetos-inox-churrasqueira-alvenaria",
    "description": "Suporte 3 Espetos Inox Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-3-espetos-inox-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 152,
    "name": "Suporte 4 Espetos Inox Churrasqueira Alvenaria",
    "price": 37.49,
    "compareAtPrice": 49.98,
    "image": "/images/produtos/ig-suporte-4-espetos-inox-churrasqueira-alvenaria.jpg",
    "rating": 4.7,
    "reviews": 126,
    "category": "Suportes para Espeto",
    "slug": "suporte-4-espetos-inox-churrasqueira-alvenaria",
    "description": "Suporte 4 Espetos Inox Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-4-espetos-inox-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 153,
    "name": "Suporte 5 Espetos Inox Churrasqueira Alvenaria",
    "price": 41.99,
    "compareAtPrice": 55.98,
    "image": "/images/produtos/ig-suporte-5-espetos-inox-churrasqueira-alvenaria.jpg",
    "rating": 4.9,
    "reviews": 167,
    "category": "Suportes para Espeto",
    "slug": "suporte-5-espetos-inox-churrasqueira-alvenaria",
    "description": "Suporte 5 Espetos Inox Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-5-espetos-inox-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 154,
    "name": "Suporte 6 Espetos Inox Churrasqueira Alvenaria",
    "price": 47.9,
    "compareAtPrice": 63.98,
    "image": "/images/produtos/ig-suporte-6-espetos-inox-churrasqueira-alvenaria.jpg",
    "rating": 4.6,
    "reviews": 208,
    "category": "Suportes para Espeto",
    "slug": "suporte-6-espetos-inox-churrasqueira-alvenaria",
    "description": "Suporte 6 Espetos Inox Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-6-espetos-inox-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 155,
    "name": "Suporte 7 Espetos Inox Churrasqueira Alvenaria",
    "price": 56.9,
    "compareAtPrice": 75.98,
    "image": "/images/produtos/ig-suporte-7-espetos-inox-churrasqueira-alvenaria.jpg",
    "rating": 4.8,
    "reviews": 249,
    "category": "Suportes para Espeto",
    "slug": "suporte-7-espetos-inox-churrasqueira-alvenaria",
    "description": "Suporte 7 Espetos Inox Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-7-espetos-inox-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 156,
    "name": "Espeto Tridente Giratório Inox 67,5cm",
    "price": 33.9,
    "compareAtPrice": 47.46,
    "image": "/images/produtos/ig-espeto-tridente-giratorio-inox-67-5cm.jpg",
    "rating": 5,
    "reviews": 50,
    "category": "Espetos e Discos",
    "slug": "espeto-tridente-giratorio-inox-67-5cm",
    "description": "Espeto Tridente Giratório Inox 67,5cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-tridente-giratorio-inox-67-5cm.jpg"
    ]
  },
  {
    "id": 157,
    "name": "Espeto Espada Giratório Churrasqueira Inox 67,5cm",
    "price": 33.9,
    "compareAtPrice": 47.46,
    "image": "/images/produtos/ig-espeto-espada-giratorio-churrasqueira-inox-67-5cm.jpg",
    "rating": 4.7,
    "reviews": 91,
    "category": "Espetos e Discos",
    "slug": "espeto-espada-giratorio-churrasqueira-inox-67-5cm",
    "description": "Espeto Espada Giratório Churrasqueira Inox 67,5cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-espada-giratorio-churrasqueira-inox-67-5cm.jpg"
    ]
  },
  {
    "id": 158,
    "name": "Espeto Grelha Côncava Giratória Cromado 67,5cm",
    "price": 31.9,
    "compareAtPrice": 44.66,
    "image": "/images/produtos/ig-espeto-grelha-concava-giratoria-cromado-67-5cm.jpg",
    "rating": 4.9,
    "reviews": 132,
    "category": "Espetos e Discos",
    "slug": "espeto-grelha-concava-giratoria-cromado-67-5cm",
    "description": "Espeto Grelha Côncava Giratória Cromado 67,5cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-grelha-concava-giratoria-cromado-67-5cm.jpg"
    ]
  },
  {
    "id": 159,
    "name": "Espeto Giratório Carrossel P/ 8 Espetinho 67,5cm",
    "price": 32.9,
    "compareAtPrice": 46.06,
    "image": "/images/produtos/ig-espeto-giratorio-carrossel-p-8-espetinho-67-5cm.jpg",
    "rating": 4.6,
    "reviews": 173,
    "category": "Espetos e Discos",
    "slug": "espeto-giratorio-carrossel-p-8-espetinho-67-5cm",
    "description": "Espeto Giratório Carrossel P/ 8 Espetinho 67,5cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-giratorio-carrossel-p-8-espetinho-67-5cm.jpg"
    ]
  },
  {
    "id": 160,
    "name": "Espeto Duplo Para Churrasco Inox Cabo Madeira 66cm",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-espeto-duplo-para-churrasco-inox-cabo-madeira-66cm.jpg",
    "rating": 4.8,
    "reviews": 214,
    "category": "Espetos e Discos",
    "slug": "espeto-duplo-para-churrasco-inox-cabo-madeira-66cm",
    "description": "Espeto Duplo Para Churrasco Inox Cabo Madeira 66cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-duplo-para-churrasco-inox-cabo-madeira-66cm.jpg"
    ]
  },
  {
    "id": 161,
    "name": "Espeto Espada Churrasco Inox 66cm",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-espeto-espada-churrasco-inox-66cm.jpg",
    "rating": 5,
    "reviews": 255,
    "category": "Espetos e Discos",
    "slug": "espeto-espada-churrasco-inox-66cm",
    "description": "Espeto Espada Churrasco Inox 66cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-espada-churrasco-inox-66cm.jpg"
    ]
  },
  {
    "id": 162,
    "name": "Espalha Brasa Puxador de Carvão De Inox 68cm",
    "price": 33.9,
    "compareAtPrice": 47.46,
    "image": "/images/produtos/ig-espalha-brasa-puxador-de-carvao-de-inox-68cm.jpg",
    "rating": 4.7,
    "reviews": 56,
    "category": "Acessórios de Churrasco",
    "slug": "espalha-brasa-puxador-de-carvao-de-inox-68cm",
    "description": "Espalha Brasa Puxador de Carvão De Inox 68cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espalha-brasa-puxador-de-carvao-de-inox-68cm.jpg"
    ]
  },
  {
    "id": 163,
    "name": "Churrasqueira Giratória Vertical Ecológica Inox 4 Espetos",
    "price": 89.9,
    "compareAtPrice": 179.98,
    "image": "/images/produtos/ig-churrasqueira-giratoria-vertical-ecologica-inox-4-espetos.jpg",
    "rating": 4.9,
    "reviews": 97,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-giratoria-vertical-ecologica-inox-4-espetos",
    "description": "Churrasqueira Giratória Vertical Ecológica Inox 4 Espetos em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-giratoria-vertical-ecologica-inox-4-espetos.jpg"
    ]
  },
  {
    "id": 164,
    "name": "Grelha Churrasco Parrilla Argentina Inox Pequena 38,5x34cm",
    "price": 41.9,
    "compareAtPrice": 58.66,
    "image": "/images/produtos/ig-grelha-churrasco-parrilla-argentina-inox-pequena-38-5x34cm.jpg",
    "rating": 4.6,
    "reviews": 138,
    "category": "Grelhas",
    "slug": "grelha-churrasco-parrilla-argentina-inox-pequena-38-5x34cm",
    "description": "Grelha Churrasco Parrilla Argentina Inox Pequena 38,5x34cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-churrasco-parrilla-argentina-inox-pequena-38-5x34cm.jpg"
    ]
  },
  {
    "id": 165,
    "name": "Grelha Churrasco Parrilla Argentina Inox Média 51x34cm",
    "price": 23.99,
    "compareAtPrice": 159.9,
    "image": "/images/produtos/ig-grelha-churrasco-parrilla-argentina-inox-media-51x34cm.jpg",
    "rating": 4.8,
    "reviews": 179,
    "category": "Grelhas",
    "slug": "grelha-churrasco-parrilla-argentina-inox-media-51x34cm",
    "description": "Grelha Churrasco Parrilla Argentina Inox Média 51x34cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-churrasco-parrilla-argentina-inox-media-51x34cm.jpg"
    ]
  },
  {
    "id": 166,
    "name": "Grelha Churrasco Parrilla Argentina Inox Grande 61,5x34cm",
    "price": 26.99,
    "compareAtPrice": 179.9,
    "image": "/images/produtos/ig-grelha-churrasco-parrilla-argentina-inox-grande-61-5x34cm.jpg",
    "rating": 5,
    "reviews": 220,
    "category": "Grelhas",
    "slug": "grelha-churrasco-parrilla-argentina-inox-grande-61-5x34cm",
    "description": "Grelha Churrasco Parrilla Argentina Inox Grande 61,5x34cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-churrasco-parrilla-argentina-inox-grande-61-5x34cm.jpg"
    ]
  },
  {
    "id": 167,
    "name": "Pá De Pizza Em Alumínio Cabo Curto 35cm",
    "price": 33.9,
    "compareAtPrice": 47.46,
    "image": "/images/produtos/ig-pa-de-pizza-em-aluminio-cabo-curto-35cm.jpg",
    "rating": 4.7,
    "reviews": 261,
    "category": "Forno de Pizza e Pás",
    "slug": "pa-de-pizza-em-aluminio-cabo-curto-35cm",
    "description": "Pá De Pizza Em Alumínio Cabo Curto 35cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pa-de-pizza-em-aluminio-cabo-curto-35cm.jpg"
    ]
  },
  {
    "id": 168,
    "name": "Pá De Pizza Deslizante De Alumínio Para Forno À Lenha 35cm",
    "price": 35.9,
    "compareAtPrice": 50.26,
    "image": "/images/produtos/ig-pa-de-pizza-deslizante-de-aluminio-para-forno-a-lenha-35cm.jpg",
    "rating": 4.9,
    "reviews": 62,
    "category": "Forno de Pizza e Pás",
    "slug": "pa-de-pizza-deslizante-de-aluminio-para-forno-a-lenha-35cm",
    "description": "Pá De Pizza Deslizante De Alumínio Para Forno À Lenha 35cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pa-de-pizza-deslizante-de-aluminio-para-forno-a-lenha-35cm.jpg"
    ]
  },
  {
    "id": 169,
    "name": "Pá De Pizza Alumínio Para Forno À Lenha 35cm",
    "price": 53.9,
    "compareAtPrice": 75.46,
    "image": "/images/produtos/ig-pa-de-pizza-aluminio-para-forno-a-lenha-35cm.jpg",
    "rating": 4.6,
    "reviews": 103,
    "category": "Forno de Pizza e Pás",
    "slug": "pa-de-pizza-aluminio-para-forno-a-lenha-35cm",
    "description": "Pá De Pizza Alumínio Para Forno À Lenha 35cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pa-de-pizza-aluminio-para-forno-a-lenha-35cm.jpg"
    ]
  },
  {
    "id": 170,
    "name": "Termômetro Analógico 350 Graus Para Forno E Estufa",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-termometro-analogico-350-graus-para-forno-e-estufa.jpg",
    "rating": 4.8,
    "reviews": 144,
    "category": "Acessórios de Churrasco",
    "slug": "termometro-analogico-350-graus-para-forno-e-estufa",
    "description": "Termômetro Analógico 350 Graus Para Forno E Estufa em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-termometro-analogico-350-graus-para-forno-e-estufa.jpg"
    ]
  },
  {
    "id": 171,
    "name": "Motor De Churrasqueira Giratória Weg 1/30cv Bivolt",
    "price": 44.9,
    "compareAtPrice": 62.86,
    "image": "/images/produtos/ig-motor-de-churrasqueira-giratoria-weg-1-30cv-bivolt.jpg",
    "rating": 5,
    "reviews": 185,
    "category": "Acessórios de Churrasco",
    "slug": "motor-de-churrasqueira-giratoria-weg-1-30cv-bivolt",
    "description": "Motor De Churrasqueira Giratória Weg 1/30cv Bivolt em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-motor-de-churrasqueira-giratoria-weg-1-30cv-bivolt.jpg"
    ]
  },
  {
    "id": 172,
    "name": "Pá De Limpeza Inox Para Churrasqueira",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-pa-de-limpeza-inox-para-churrasqueira.jpg",
    "rating": 4.7,
    "reviews": 226,
    "category": "Acessórios de Churrasco",
    "slug": "pa-de-limpeza-inox-para-churrasqueira",
    "description": "Pá De Limpeza Inox Para Churrasqueira em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pa-de-limpeza-inox-para-churrasqueira.jpg"
    ]
  },
  {
    "id": 173,
    "name": "Churrasqueira Grill Giratório 3 Espetos de Inox Motor Removível",
    "price": 61.9,
    "compareAtPrice": 123.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-3-espetos-de-inox-motor-removivel.jpg",
    "rating": 4.9,
    "reviews": 267,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-3-espetos-de-inox-motor-removivel",
    "description": "Churrasqueira Grill Giratório 3 Espetos de Inox Motor Removível em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-3-espetos-de-inox-motor-removivel.jpg"
    ]
  },
  {
    "id": 174,
    "name": "Churrasqueira Grill Giratório 7 Espetos de Inox Motor Removível",
    "price": 89.9,
    "compareAtPrice": 179.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-7-espetos-de-inox-motor-removivel.jpg",
    "rating": 4.6,
    "reviews": 68,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-7-espetos-de-inox-motor-removivel",
    "description": "Churrasqueira Grill Giratório 7 Espetos de Inox Motor Removível em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-7-espetos-de-inox-motor-removivel.jpg"
    ]
  },
  {
    "id": 175,
    "name": "Grelha Churrasqueira Moeda Média 50x37cm Inox",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-grelha-churrasqueira-moeda-media-50x37cm-inox.jpg",
    "rating": 4.8,
    "reviews": 109,
    "category": "Grelhas",
    "slug": "grelha-churrasqueira-moeda-media-50x37cm-inox",
    "description": "Grelha Churrasqueira Moeda Média 50x37cm Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-churrasqueira-moeda-media-50x37cm-inox.jpg"
    ]
  },
  {
    "id": 176,
    "name": "Grelha Churrasqueira Moeda Pequena 40x37cm Inox",
    "price": 32.9,
    "compareAtPrice": 46.06,
    "image": "/images/produtos/ig-grelha-churrasqueira-moeda-pequena-40x37cm-inox.jpg",
    "rating": 5,
    "reviews": 150,
    "category": "Grelhas",
    "slug": "grelha-churrasqueira-moeda-pequena-40x37cm-inox",
    "description": "Grelha Churrasqueira Moeda Pequena 40x37cm Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-churrasqueira-moeda-pequena-40x37cm-inox.jpg"
    ]
  },
  {
    "id": 177,
    "name": "Grelha Churrasqueira Moeda Grande 60x37cm Inox",
    "price": 44.9,
    "compareAtPrice": 62.86,
    "image": "/images/produtos/ig-grelha-churrasqueira-moeda-grande-60x37cm-inox.jpg",
    "rating": 4.7,
    "reviews": 191,
    "category": "Grelhas",
    "slug": "grelha-churrasqueira-moeda-grande-60x37cm-inox",
    "description": "Grelha Churrasqueira Moeda Grande 60x37cm Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-churrasqueira-moeda-grande-60x37cm-inox.jpg"
    ]
  },
  {
    "id": 178,
    "name": "Kit Sal Grosso Temperado Para Churrasco 4 Unidades Mestre Churrasqueiro",
    "price": 37.9,
    "compareAtPrice": 53.06,
    "image": "/images/produtos/ig-kit-sal-grosso-temperado-para-churrasco-4-unidades-mestre-churrasqueiro.jpg",
    "rating": 4.9,
    "reviews": 232,
    "category": "Temperos para Churrasco",
    "slug": "kit-sal-grosso-temperado-para-churrasco-4-unidades-mestre-churrasqueiro",
    "description": "Kit Sal Grosso Temperado Para Churrasco 4 Unidades Mestre Churrasqueiro em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-kit-sal-grosso-temperado-para-churrasco-4-unidades-mestre-churrasqueiro.jpg"
    ]
  },
  {
    "id": 179,
    "name": "Gaveta Cinzeiro para Churrasqueira",
    "price": 37.9,
    "compareAtPrice": 53.06,
    "image": "/images/produtos/ig-gaveta-cinzeiro-para-churrasqueira.jpg",
    "rating": 4.6,
    "reviews": 273,
    "category": "Acessórios de Churrasco",
    "slug": "gaveta-cinzeiro-para-churrasqueira",
    "description": "Gaveta Cinzeiro para Churrasqueira em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-gaveta-cinzeiro-para-churrasqueira.jpg"
    ]
  },
  {
    "id": 180,
    "name": "Churrasqueira Portátil Grill Giratório 5 Espetos",
    "price": 84.9,
    "compareAtPrice": 169.98,
    "image": "/images/produtos/ig-churrasqueira-portatil-grill-giratorio-5-espetos.jpg",
    "rating": 4.8,
    "reviews": 74,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-portatil-grill-giratorio-5-espetos",
    "description": "Churrasqueira Portátil Grill Giratório 5 Espetos em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-portatil-grill-giratorio-5-espetos.jpg"
    ]
  },
  {
    "id": 181,
    "name": "Par Disco em Inox Para Espeto Giratório Carrossel",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-par-disco-em-inox-para-espeto-giratorio-carrossel.jpg",
    "rating": 5,
    "reviews": 115,
    "category": "Espetos e Discos",
    "slug": "par-disco-em-inox-para-espeto-giratorio-carrossel",
    "description": "Par Disco em Inox Para Espeto Giratório Carrossel em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-par-disco-em-inox-para-espeto-giratorio-carrossel.jpg"
    ]
  },
  {
    "id": 182,
    "name": "Espeto Giratório Elétrico Churrasco com Base",
    "price": 31.9,
    "compareAtPrice": 44.66,
    "image": "/images/produtos/ig-espeto-giratorio-eletrico-churrasco-com-base.png",
    "rating": 4.7,
    "reviews": 156,
    "category": "Espetos e Discos",
    "slug": "espeto-giratorio-eletrico-churrasco-com-base",
    "description": "Espeto Giratório Elétrico Churrasco com Base em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-giratorio-eletrico-churrasco-com-base.png"
    ]
  },
  {
    "id": 183,
    "name": "Kit Sal de Parrilla Temperado Para Churrasco 9 Unidades Poletto",
    "price": 43.9,
    "compareAtPrice": 61.46,
    "image": "/images/produtos/ig-kit-sal-de-parrilla-temperado-para-churrasco-9-unidades-poletto.jpg",
    "rating": 4.9,
    "reviews": 197,
    "category": "Temperos para Churrasco",
    "slug": "kit-sal-de-parrilla-temperado-para-churrasco-9-unidades-poletto",
    "description": "Kit Sal de Parrilla Temperado Para Churrasco 9 Unidades Poletto em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-kit-sal-de-parrilla-temperado-para-churrasco-9-unidades-poletto.jpg"
    ]
  },
  {
    "id": 184,
    "name": "Grelha Churrasco Parrilla Uruguaia Inox Pequena 38,5x36cm",
    "price": 23.99,
    "compareAtPrice": 159.9,
    "image": "/images/produtos/ig-grelha-churrasco-parrilla-uruguaia-inox-pequena-38-5x36cm.jpg",
    "rating": 4.6,
    "reviews": 238,
    "category": "Grelhas",
    "slug": "grelha-churrasco-parrilla-uruguaia-inox-pequena-38-5x36cm",
    "description": "Grelha Churrasco Parrilla Uruguaia Inox Pequena 38,5x36cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-churrasco-parrilla-uruguaia-inox-pequena-38-5x36cm.jpg"
    ]
  },
  {
    "id": 185,
    "name": "Grelha Uruguaia Parrilla Média Inox 48,5x36cm",
    "price": 26.99,
    "compareAtPrice": 179.9,
    "image": "/images/produtos/ig-grelha-uruguaia-parrilla-media-inox-48-5x36cm.jpg",
    "rating": 4.8,
    "reviews": 39,
    "category": "Grelhas",
    "slug": "grelha-uruguaia-parrilla-media-inox-48-5x36cm",
    "description": "Grelha Uruguaia Parrilla Média Inox 48,5x36cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-uruguaia-parrilla-media-inox-48-5x36cm.jpg"
    ]
  },
  {
    "id": 186,
    "name": "Grelha Parrilla Uruguaia Inox Grande 58,5x36cm",
    "price": 29.99,
    "compareAtPrice": 199.9,
    "image": "/images/produtos/ig-grelha-parrilla-uruguaia-inox-grande-58-5x36cm.jpg",
    "rating": 5,
    "reviews": 80,
    "category": "Grelhas",
    "slug": "grelha-parrilla-uruguaia-inox-grande-58-5x36cm",
    "description": "Grelha Parrilla Uruguaia Inox Grande 58,5x36cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grelha-parrilla-uruguaia-inox-grande-58-5x36cm.jpg"
    ]
  },
  {
    "id": 187,
    "name": "Grill Giratório 4 Espetos de Inox Motor Removível Embutido",
    "price": 69.9,
    "compareAtPrice": 139.98,
    "image": "/images/produtos/ig-grill-giratorio-4-espetos-de-inox-motor-removivel-embutido.jpg",
    "rating": 4.7,
    "reviews": 121,
    "category": "Churrasqueiras",
    "slug": "grill-giratorio-4-espetos-de-inox-motor-removivel-embutido",
    "description": "Grill Giratório 4 Espetos de Inox Motor Removível Embutido em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grill-giratorio-4-espetos-de-inox-motor-removivel-embutido.jpg"
    ]
  },
  {
    "id": 188,
    "name": "Grill Giratório 6 Espetos de Inox Motor Removível Embutido",
    "price": 79.9,
    "compareAtPrice": 159.98,
    "image": "/images/produtos/ig-grill-giratorio-6-espetos-de-inox-motor-removivel-embutido.jpg",
    "rating": 4.9,
    "reviews": 162,
    "category": "Churrasqueiras",
    "slug": "grill-giratorio-6-espetos-de-inox-motor-removivel-embutido",
    "description": "Grill Giratório 6 Espetos de Inox Motor Removível Embutido em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grill-giratorio-6-espetos-de-inox-motor-removivel-embutido.jpg"
    ]
  },
  {
    "id": 189,
    "name": "Grill Giratório 5 Espetos de Inox Motor Removível Embutido",
    "price": 74.9,
    "compareAtPrice": 149.98,
    "image": "/images/produtos/ig-grill-giratorio-5-espetos-de-inox-motor-removivel-embutido.jpg",
    "rating": 4.6,
    "reviews": 203,
    "category": "Churrasqueiras",
    "slug": "grill-giratorio-5-espetos-de-inox-motor-removivel-embutido",
    "description": "Grill Giratório 5 Espetos de Inox Motor Removível Embutido em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-grill-giratorio-5-espetos-de-inox-motor-removivel-embutido.jpg"
    ]
  },
  {
    "id": 190,
    "name": "Espeto Grelha Peixe Giratória Cromado 67,5cm",
    "price": 40.9,
    "compareAtPrice": 57.26,
    "image": "/images/produtos/ig-espeto-grelha-peixe-giratoria-cromado-67-5cm.jpg",
    "rating": 4.8,
    "reviews": 244,
    "category": "Espetos e Discos",
    "slug": "espeto-grelha-peixe-giratoria-cromado-67-5cm",
    "description": "Espeto Grelha Peixe Giratória Cromado 67,5cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-grelha-peixe-giratoria-cromado-67-5cm.jpg"
    ]
  },
  {
    "id": 191,
    "name": "Pá de Pizza Cabo Curto Premium 35cm",
    "price": 43.9,
    "compareAtPrice": 61.46,
    "image": "/images/produtos/ig-pa-de-pizza-cabo-curto-premium-35cm.jpg",
    "rating": 5,
    "reviews": 45,
    "category": "Forno de Pizza e Pás",
    "slug": "pa-de-pizza-cabo-curto-premium-35cm",
    "description": "Pá de Pizza Cabo Curto Premium 35cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pa-de-pizza-cabo-curto-premium-35cm.jpg"
    ]
  },
  {
    "id": 192,
    "name": "Mesa Bistrô Dobrável Madeira Imbuia",
    "price": 43.49,
    "compareAtPrice": 57.98,
    "image": "/images/produtos/ig-mesa-bistro-dobravel-madeira-imbuia.png",
    "rating": 4.7,
    "reviews": 86,
    "category": "Mesas e Cadeiras",
    "slug": "mesa-bistro-dobravel-madeira-imbuia",
    "description": "Mesa Bistrô Dobrável Madeira Imbuia em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-mesa-bistro-dobravel-madeira-imbuia.png"
    ]
  },
  {
    "id": 193,
    "name": "Chapa Para Fogão A Lenha Ferro Fundido De 4 Bocas Redutores",
    "price": 50.9,
    "compareAtPrice": 67.98,
    "image": "/images/produtos/ig-chapa-para-fogao-a-lenha-ferro-fundido-de-4-bocas-redutores.jpg",
    "rating": 4.9,
    "reviews": 127,
    "category": "Acessórios de Churrasco",
    "slug": "chapa-para-fogao-a-lenha-ferro-fundido-de-4-bocas-redutores",
    "description": "Chapa Para Fogão A Lenha Ferro Fundido De 4 Bocas Redutores em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-chapa-para-fogao-a-lenha-ferro-fundido-de-4-bocas-redutores.jpg"
    ]
  },
  {
    "id": 194,
    "name": "Soprador Acendedor Elétrico De Carvão Churrasqueira",
    "price": 35.9,
    "compareAtPrice": 50.26,
    "image": "/images/produtos/ig-soprador-acendedor-eletrico-de-carvao-churrasqueira.jpg",
    "rating": 4.6,
    "reviews": 168,
    "category": "Acessórios de Churrasco",
    "slug": "soprador-acendedor-eletrico-de-carvao-churrasqueira",
    "description": "Soprador Acendedor Elétrico De Carvão Churrasqueira em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-soprador-acendedor-eletrico-de-carvao-churrasqueira.jpg"
    ]
  },
  {
    "id": 195,
    "name": "Chapa Churrasqueira De Ferro Fundido Para Petiscos- 25x45cm",
    "price": 28.49,
    "compareAtPrice": 189.9,
    "image": "/images/produtos/ig-chapa-churrasqueira-de-ferro-fundido-para-petiscos-25x45cm.jpg",
    "rating": 4.8,
    "reviews": 209,
    "category": "Acessórios de Churrasco",
    "slug": "chapa-churrasqueira-de-ferro-fundido-para-petiscos-25x45cm",
    "description": "Chapa Churrasqueira De Ferro Fundido Para Petiscos- 25x45cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-chapa-churrasqueira-de-ferro-fundido-para-petiscos-25x45cm.jpg"
    ]
  },
  {
    "id": 196,
    "name": "Churrasqueira Carrinho Espetinhos Portátil com Grelha Inox",
    "price": 37.49,
    "compareAtPrice": 49.98,
    "image": "/images/produtos/ig-churrasqueira-carrinho-espetinhos-portatil-com-grelha-inox.jpg",
    "rating": 5,
    "reviews": 250,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-carrinho-espetinhos-portatil-com-grelha-inox",
    "description": "Churrasqueira Carrinho Espetinhos Portátil com Grelha Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-carrinho-espetinhos-portatil-com-grelha-inox.jpg"
    ]
  },
  {
    "id": 197,
    "name": "Cadeira Bistrô Alta De Madeira Para Apartamento Sacada",
    "price": 40.49,
    "compareAtPrice": 53.98,
    "image": "/images/produtos/ig-cadeira-bistro-alta-de-madeira-para-apartamento-sacada.jpg",
    "rating": 4.7,
    "reviews": 51,
    "category": "Mesas e Cadeiras",
    "slug": "cadeira-bistro-alta-de-madeira-para-apartamento-sacada",
    "description": "Cadeira Bistrô Alta De Madeira Para Apartamento Sacada em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-cadeira-bistro-alta-de-madeira-para-apartamento-sacada.jpg"
    ]
  },
  {
    "id": 198,
    "name": "2 Cadeiras Bistrô Alta De Madeira Para Apartamento Sacada",
    "price": 44.99,
    "compareAtPrice": 89.98,
    "image": "/images/produtos/ig-2-cadeiras-bistro-alta-de-madeira-para-apartamento-sacada.jpg",
    "rating": 4.9,
    "reviews": 92,
    "category": "Mesas e Cadeiras",
    "slug": "2-cadeiras-bistro-alta-de-madeira-para-apartamento-sacada",
    "description": "2 Cadeiras Bistrô Alta De Madeira Para Apartamento Sacada em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-2-cadeiras-bistro-alta-de-madeira-para-apartamento-sacada.jpg"
    ]
  },
  {
    "id": 199,
    "name": "Conjunto Dobrável Bistrô De Mesa Com 2 Cadeiras",
    "price": 69.9,
    "compareAtPrice": 139.98,
    "image": "/images/produtos/ig-conjunto-dobravel-bistro-de-mesa-com-2-cadeiras.jpg",
    "rating": 4.6,
    "reviews": 133,
    "category": "Mesas e Cadeiras",
    "slug": "conjunto-dobravel-bistro-de-mesa-com-2-cadeiras",
    "description": "Conjunto Dobrável Bistrô De Mesa Com 2 Cadeiras em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-conjunto-dobravel-bistro-de-mesa-com-2-cadeiras.jpg"
    ]
  },
  {
    "id": 200,
    "name": "Chapa Fogão A Lenha 70x32x26cm 3 Bocas Ferro Fundido",
    "price": 37.49,
    "compareAtPrice": 49.98,
    "image": "/images/produtos/ig-chapa-fogao-a-lenha-70x32x26cm-3-bocas-ferro-fundido.jpg",
    "rating": 4.8,
    "reviews": 174,
    "category": "Acessórios de Churrasco",
    "slug": "chapa-fogao-a-lenha-70x32x26cm-3-bocas-ferro-fundido",
    "description": "Chapa Fogão A Lenha 70x32x26cm 3 Bocas Ferro Fundido em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-chapa-fogao-a-lenha-70x32x26cm-3-bocas-ferro-fundido.jpg"
    ]
  },
  {
    "id": 201,
    "name": "Churrasqueira Grill Giratório 6 Espetos Inox Motor Fixo",
    "price": 64.9,
    "compareAtPrice": 129.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-6-espetos-inox-motor-fixo.jpg",
    "rating": 5,
    "reviews": 215,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-6-espetos-inox-motor-fixo",
    "description": "Churrasqueira Grill Giratório 6 Espetos Inox Motor Fixo em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-6-espetos-inox-motor-fixo.jpg"
    ]
  },
  {
    "id": 202,
    "name": "Churrasqueira Grill Giratório 5 Espetos Inox Motor Fixo",
    "price": 59.9,
    "compareAtPrice": 119.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-5-espetos-inox-motor-fixo.jpg",
    "rating": 4.7,
    "reviews": 256,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-5-espetos-inox-motor-fixo",
    "description": "Churrasqueira Grill Giratório 5 Espetos Inox Motor Fixo em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-5-espetos-inox-motor-fixo.jpg"
    ]
  },
  {
    "id": 203,
    "name": "Churrasqueira Grill Giratório 4 Espetos Inox Motor Fixo",
    "price": 54.9,
    "compareAtPrice": 109.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-4-espetos-inox-motor-fixo.jpg",
    "rating": 4.9,
    "reviews": 57,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-4-espetos-inox-motor-fixo",
    "description": "Churrasqueira Grill Giratório 4 Espetos Inox Motor Fixo em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-4-espetos-inox-motor-fixo.jpg"
    ]
  },
  {
    "id": 204,
    "name": "Forno de Pizza Para Churrasqueira Quadrado Inox",
    "price": 39.99,
    "compareAtPrice": 79.98,
    "image": "/images/produtos/ig-forno-de-pizza-para-churrasqueira-quadrado-inox.jpg",
    "rating": 4.6,
    "reviews": 98,
    "category": "Forno de Pizza e Pás",
    "slug": "forno-de-pizza-para-churrasqueira-quadrado-inox",
    "description": "Forno de Pizza Para Churrasqueira Quadrado Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-forno-de-pizza-para-churrasqueira-quadrado-inox.jpg"
    ]
  },
  {
    "id": 205,
    "name": "Churrasqueira Grelha + Espeto Giratório Carrossel 16 Espetinhos",
    "price": 44.99,
    "compareAtPrice": 59.98,
    "image": "/images/produtos/ig-churrasqueira-grelha-espeto-giratorio-carrossel-16-espetinhos.jpg",
    "rating": 4.8,
    "reviews": 139,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grelha-espeto-giratorio-carrossel-16-espetinhos",
    "description": "Churrasqueira Grelha + Espeto Giratório Carrossel 16 Espetinhos em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grelha-espeto-giratorio-carrossel-16-espetinhos.jpg"
    ]
  },
  {
    "id": 206,
    "name": "Churrasqueira Pequena Portátil com Grelha em Inox",
    "price": 35.9,
    "compareAtPrice": 50.26,
    "image": "/images/produtos/ig-churrasqueira-pequena-portatil-com-grelha-em-inox.jpg",
    "rating": 5,
    "reviews": 180,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-pequena-portatil-com-grelha-em-inox",
    "description": "Churrasqueira Pequena Portátil com Grelha em Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-pequena-portatil-com-grelha-em-inox.jpg"
    ]
  },
  {
    "id": 207,
    "name": "Churrasqueira Espetinhos Portátil Com Grelha Inox",
    "price": 29.99,
    "compareAtPrice": 199.9,
    "image": "/images/produtos/ig-churrasqueira-espetinhos-portatil-com-grelha-inox.jpg",
    "rating": 4.7,
    "reviews": 221,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-espetinhos-portatil-com-grelha-inox",
    "description": "Churrasqueira Espetinhos Portátil Com Grelha Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-espetinhos-portatil-com-grelha-inox.jpg"
    ]
  },
  {
    "id": 208,
    "name": "Espeto Giratório Carrossel com 8 Espetinho em inox",
    "price": 40.9,
    "compareAtPrice": 57.26,
    "image": "/images/produtos/ig-espeto-giratorio-carrossel-com-8-espetinho-em-inox.jpg",
    "rating": 4.9,
    "reviews": 262,
    "category": "Espetos e Discos",
    "slug": "espeto-giratorio-carrossel-com-8-espetinho-em-inox",
    "description": "Espeto Giratório Carrossel com 8 Espetinho em inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-giratorio-carrossel-com-8-espetinho-em-inox.jpg"
    ]
  },
  {
    "id": 209,
    "name": "Espeto de Garras Giratório Premium para Frango",
    "price": 43.9,
    "compareAtPrice": 61.46,
    "image": "/images/produtos/ig-espeto-de-garras-giratorio-premium-para-frango.jpg",
    "rating": 4.6,
    "reviews": 63,
    "category": "Espetos e Discos",
    "slug": "espeto-de-garras-giratorio-premium-para-frango",
    "description": "Espeto de Garras Giratório Premium para Frango em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-de-garras-giratorio-premium-para-frango.jpg"
    ]
  },
  {
    "id": 210,
    "name": "Pegador de Carvão 50cm Inox para Churrasco",
    "price": 46.9,
    "compareAtPrice": 65.66,
    "image": "/images/produtos/ig-pegador-de-carvao-50cm-inox-para-churrasco.jpg",
    "rating": 4.8,
    "reviews": 104,
    "category": "Acessórios de Churrasco",
    "slug": "pegador-de-carvao-50cm-inox-para-churrasco",
    "description": "Pegador de Carvão 50cm Inox para Churrasco em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pegador-de-carvao-50cm-inox-para-churrasco.jpg"
    ]
  },
  {
    "id": 211,
    "name": "Pegador De Carne Pinça Para Churrasco 40cm Inox",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-pegador-de-carne-pinca-para-churrasco-40cm-inox.jpg",
    "rating": 5,
    "reviews": 145,
    "category": "Acessórios de Churrasco",
    "slug": "pegador-de-carne-pinca-para-churrasco-40cm-inox",
    "description": "Pegador De Carne Pinça Para Churrasco 40cm Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pegador-de-carne-pinca-para-churrasco-40cm-inox.jpg"
    ]
  },
  {
    "id": 212,
    "name": "Churrasqueira para Barco Bote Lancha com Grelha e Suporte Inox",
    "price": 44.9,
    "compareAtPrice": 62.86,
    "image": "/images/produtos/ig-churrasqueira-para-barco-bote-lancha-com-grelha-e-suporte-inox.png",
    "rating": 4.7,
    "reviews": 186,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-para-barco-bote-lancha-com-grelha-e-suporte-inox",
    "description": "Churrasqueira para Barco Bote Lancha com Grelha e Suporte Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-para-barco-bote-lancha-com-grelha-e-suporte-inox.png"
    ]
  },
  {
    "id": 213,
    "name": "Vassoura Para Limpeza Inox da Churrasqueira e Forno à Lenha",
    "price": 37.9,
    "compareAtPrice": 53.06,
    "image": "/images/produtos/ig-vassoura-para-limpeza-inox-da-churrasqueira-e-forno-a-lenha.png",
    "rating": 4.9,
    "reviews": 227,
    "category": "Acessórios de Churrasco",
    "slug": "vassoura-para-limpeza-inox-da-churrasqueira-e-forno-a-lenha",
    "description": "Vassoura Para Limpeza Inox da Churrasqueira e Forno à Lenha em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-vassoura-para-limpeza-inox-da-churrasqueira-e-forno-a-lenha.png"
    ]
  },
  {
    "id": 214,
    "name": "Espeto giratório elétrico carrossel 16 espetinhos 67cm Inox",
    "price": 44.9,
    "compareAtPrice": 62.86,
    "image": "/images/produtos/ig-espeto-giratorio-eletrico-carrossel-16-espetinhos-67cm-inox.png",
    "rating": 4.6,
    "reviews": 268,
    "category": "Espetos e Discos",
    "slug": "espeto-giratorio-eletrico-carrossel-16-espetinhos-67cm-inox",
    "description": "Espeto giratório elétrico carrossel 16 espetinhos 67cm Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-espeto-giratorio-eletrico-carrossel-16-espetinhos-67cm-inox.png"
    ]
  },
  {
    "id": 215,
    "name": "Churrasqueira De Inox com Rodinha + Grelha Moeda Média Inox",
    "price": 54.9,
    "compareAtPrice": 109.98,
    "image": "/images/produtos/ig-churrasqueira-de-inox-com-rodinha-grelha-moeda-media-inox.jpg",
    "rating": 4.8,
    "reviews": 69,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-de-inox-com-rodinha-grelha-moeda-media-inox",
    "description": "Churrasqueira De Inox com Rodinha + Grelha Moeda Média Inox em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-de-inox-com-rodinha-grelha-moeda-media-inox.jpg"
    ]
  },
  {
    "id": 216,
    "name": "Par de Discos Para Espeto Giratório Carrossel 16 Espetinhos",
    "price": 43.9,
    "compareAtPrice": 61.46,
    "image": "/images/produtos/ig-par-de-discos-para-espeto-giratorio-carrossel-16-espetinhos.jpg",
    "rating": 5,
    "reviews": 110,
    "category": "Espetos e Discos",
    "slug": "par-de-discos-para-espeto-giratorio-carrossel-16-espetinhos",
    "description": "Par de Discos Para Espeto Giratório Carrossel 16 Espetinhos em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-par-de-discos-para-espeto-giratorio-carrossel-16-espetinhos.jpg"
    ]
  },
  {
    "id": 217,
    "name": "Sal de parrilla tradicional para churrasco 500g",
    "price": 30.9,
    "compareAtPrice": 43.26,
    "image": "/images/produtos/ig-sal-de-parrilla-tradicional-para-churrasco-500g.jpg",
    "rating": 4.7,
    "reviews": 151,
    "category": "Temperos para Churrasco",
    "slug": "sal-de-parrilla-tradicional-para-churrasco-500g",
    "description": "Sal de parrilla tradicional para churrasco 500g em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-sal-de-parrilla-tradicional-para-churrasco-500g.jpg"
    ]
  },
  {
    "id": 218,
    "name": "Exaustor para Churrasqueira Weg com Suporte Inox Bivolt",
    "price": 28.49,
    "compareAtPrice": 189.9,
    "image": "/images/produtos/ig-exaustor-para-churrasqueira-weg-com-suporte-inox-bivolt.jpg",
    "rating": 4.9,
    "reviews": 192,
    "category": "Acessórios de Churrasco",
    "slug": "exaustor-para-churrasqueira-weg-com-suporte-inox-bivolt",
    "description": "Exaustor para Churrasqueira Weg com Suporte Inox Bivolt em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-exaustor-para-churrasqueira-weg-com-suporte-inox-bivolt.jpg"
    ]
  },
  {
    "id": 219,
    "name": "Pá De Pizza Em Inox Cabo Curto 36cm",
    "price": 35.9,
    "compareAtPrice": 50.26,
    "image": "/images/produtos/ig-pa-de-pizza-em-inox-cabo-curto-36cm.jpg",
    "rating": 4.6,
    "reviews": 233,
    "category": "Forno de Pizza e Pás",
    "slug": "pa-de-pizza-em-inox-cabo-curto-36cm",
    "description": "Pá De Pizza Em Inox Cabo Curto 36cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pa-de-pizza-em-inox-cabo-curto-36cm.jpg"
    ]
  },
  {
    "id": 220,
    "name": "Pá De Pizza Inox Para Forno À Lenha 36cm",
    "price": 45.9,
    "compareAtPrice": 64.26,
    "image": "/images/produtos/ig-pa-de-pizza-inox-para-forno-a-lenha-36cm.png",
    "rating": 4.8,
    "reviews": 274,
    "category": "Forno de Pizza e Pás",
    "slug": "pa-de-pizza-inox-para-forno-a-lenha-36cm",
    "description": "Pá De Pizza Inox Para Forno À Lenha 36cm em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-pa-de-pizza-inox-para-forno-a-lenha-36cm.png"
    ]
  },
  {
    "id": 221,
    "name": "Churrasqueira Grill Giratório 3 Espetos de Inox com Grelha Elevatória",
    "price": 159.9,
    "compareAtPrice": 319.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-3-espetos-de-inox-com-grelha-elevatoria.jpg",
    "rating": 5,
    "reviews": 75,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-3-espetos-de-inox-com-grelha-elevatoria",
    "description": "Churrasqueira Grill Giratório 3 Espetos de Inox com Grelha Elevatória em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-3-espetos-de-inox-com-grelha-elevatoria.jpg"
    ]
  },
  {
    "id": 222,
    "name": "Churrasqueira Grill Giratório 4 Espetos de Inox com Grelha Elevatória",
    "price": 169.9,
    "compareAtPrice": 339.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-4-espetos-de-inox-com-grelha-elevatoria.jpg",
    "rating": 4.7,
    "reviews": 116,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-4-espetos-de-inox-com-grelha-elevatoria",
    "description": "Churrasqueira Grill Giratório 4 Espetos de Inox com Grelha Elevatória em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-4-espetos-de-inox-com-grelha-elevatoria.jpg"
    ]
  },
  {
    "id": 223,
    "name": "Churrasqueira Grill Giratório 5 Espetos de Inox com Grelha Elevatória",
    "price": 179.9,
    "compareAtPrice": 359.98,
    "image": "/images/produtos/ig-churrasqueira-grill-giratorio-5-espetos-de-inox-com-grelha-elevatoria.jpg",
    "rating": 4.9,
    "reviews": 157,
    "category": "Churrasqueiras",
    "slug": "churrasqueira-grill-giratorio-5-espetos-de-inox-com-grelha-elevatoria",
    "description": "Churrasqueira Grill Giratório 5 Espetos de Inox com Grelha Elevatória em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-churrasqueira-grill-giratorio-5-espetos-de-inox-com-grelha-elevatoria.jpg"
    ]
  },
  {
    "id": 224,
    "name": "Par Disco com 8 Espetinhos em Inox para Espeto Giratório Carrossel",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-par-disco-com-8-espetinhos-em-inox-para-espeto-giratorio-carrossel.jpg",
    "rating": 4.6,
    "reviews": 198,
    "category": "Espetos e Discos",
    "slug": "par-disco-com-8-espetinhos-em-inox-para-espeto-giratorio-carrossel",
    "description": "Par Disco com 8 Espetinhos em Inox para Espeto Giratório Carrossel em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-par-disco-com-8-espetinhos-em-inox-para-espeto-giratorio-carrossel.jpg"
    ]
  },
  {
    "id": 225,
    "name": "Suporte Fixo 50cm Inox para Espetos Churrasqueira Alvenaria",
    "price": 35.9,
    "compareAtPrice": 50.26,
    "image": "/images/produtos/ig-suporte-fixo-50cm-inox-para-espetos-churrasqueira-alvenaria.jpg",
    "rating": 4.8,
    "reviews": 239,
    "category": "Suportes para Espeto",
    "slug": "suporte-fixo-50cm-inox-para-espetos-churrasqueira-alvenaria",
    "description": "Suporte Fixo 50cm Inox para Espetos Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-fixo-50cm-inox-para-espetos-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 226,
    "name": "Suporte Fixo 60cm Inox para Espetos Churrasqueira Alvenaria",
    "price": 38.9,
    "compareAtPrice": 54.46,
    "image": "/images/produtos/ig-suporte-fixo-60cm-inox-para-espetos-churrasqueira-alvenaria.jpg",
    "rating": 5,
    "reviews": 40,
    "category": "Suportes para Espeto",
    "slug": "suporte-fixo-60cm-inox-para-espetos-churrasqueira-alvenaria",
    "description": "Suporte Fixo 60cm Inox para Espetos Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-fixo-60cm-inox-para-espetos-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 227,
    "name": "Suporte Fixo 70cm Inox para Espetos Churrasqueira Alvenaria",
    "price": 41.9,
    "compareAtPrice": 58.66,
    "image": "/images/produtos/ig-suporte-fixo-70cm-inox-para-espetos-churrasqueira-alvenaria.jpg",
    "rating": 4.7,
    "reviews": 81,
    "category": "Suportes para Espeto",
    "slug": "suporte-fixo-70cm-inox-para-espetos-churrasqueira-alvenaria",
    "description": "Suporte Fixo 70cm Inox para Espetos Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-fixo-70cm-inox-para-espetos-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 228,
    "name": "Suporte Fixo 80cm Inox para Espetos Churrasqueira Alvenaria",
    "price": 44.9,
    "compareAtPrice": 62.86,
    "image": "/images/produtos/ig-suporte-fixo-80cm-inox-para-espetos-churrasqueira-alvenaria.jpg",
    "rating": 4.9,
    "reviews": 122,
    "category": "Suportes para Espeto",
    "slug": "suporte-fixo-80cm-inox-para-espetos-churrasqueira-alvenaria",
    "description": "Suporte Fixo 80cm Inox para Espetos Churrasqueira Alvenaria em aço inox de alta durabilidade. Acabamento premium, ideal para quem leva o churrasco a sério. Enviamos para todo o Brasil.",
    "isTest": false,
    "tags": [],
    "images": [
      "/images/produtos/ig-suporte-fixo-80cm-inox-para-espetos-churrasqueira-alvenaria.jpg"
    ]
  },
  {
    "id": 230,
    "name": "Churrasqueira Portátil a Carvão GG Trip Bag",
    "price": 149.9,
    "compareAtPrice": 399,
    "image": "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-7.webp",
    "images": [
      "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-7.webp",
      "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-1.webp",
      "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-2.webp",
      "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-3.webp",
      "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-4.webp",
      "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-5.webp",
      "/images/produtos/churrasqueira-portatil-a-carvao-gg-trip-bag-6.webp"
    ],
    "rating": 4.7,
    "reviews": 89,
    "category": "Churrasqueiras Elétricas",
    "slug": "churrasqueira-portatil-a-carvao-gg-trip-bag",
    "description": "<p style=\"text-align: center;\"><br></p><video controls=\"true\" class=\"rounded-lg\" src=\"https://mquvuotoeu2mw7ad.public.blob.vercel-storage.com/snaptik_7640594730543238420_v3-skWEWVdboUKwaTIXY1XyumHfIIXXQr.mp4\"></video><p style=\"text-align: center;\"></p><img src=\"https://mquvuotoeu2mw7ad.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20de%20jul.%20de%202026%2C%2023_28_09-HiXLl3pAfCSFl76awI2ohgdRIzzzCA.png\" class=\"rounded-lg gg-img-center gg-img-w-100\"><p></p><img src=\"https://mquvuotoeu2mw7ad.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20de%20jul.%20de%202026%2C%2023_20_33-jvQP9aD31S5E2DzCDeXByQFCt5gtRJ.png\" class=\"rounded-lg gg-img-center gg-img-w-100\"><p></p><img src=\"https://mquvuotoeu2mw7ad.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20de%20jul.%20de%202026%2C%2023_31_11-ZEf0xSQwi19OfRWOQiQPq2o0kXeZ0g.png\" class=\"rounded-lg gg-img-center gg-img-w-100\"><p></p><img src=\"https://mquvuotoeu2mw7ad.public.blob.vercel-storage.com/img04_diagram_pt-6pLkSoRDZk92dkzLwBdv8A6X1BTk5W.png\" class=\"rounded-lg gg-img-center gg-img-w-100\"><h2><br>Churrasqueira Portátil a Carvão GG Trip Bag — produto da linha Churrasqueiras Elétricas da nossa loja. Grelha em ferro fundido de 310mm com revestimento antiaderente, estrutura em aço inoxidável e ventoinha de controle de brasa (pilhas ou USB) que reduz a fumaça e queima por até 2 horas. Acompanha bag exclusiva pra levar pra qualquer lugar. Qualidade premium, acabamento em inox e a durabilidade que o seu churrasco merece. Entrega para todo o Brasil.</h2><p></p>",
    "isTest": false,
    "tags": []
  },
  {
    "id": 229,
    "name": "Produto de Teste — Pagamento (R$5)",
    "price": 5,
    "image": "/images/logo-gold-grill.png",
    "rating": 5,
    "reviews": 1,
    "category": "Acessórios de Churrasco",
    "slug": "produto-teste-pagamento",
    "description": "<p>MARCA2-1784690240</p><p>Produto de teste para validar o fluxo de pagamento de ponta a ponta (PIX, e-mail de confirmação, painel). NÃO é um produto real — não aplicar cupom para bater o valor mínimo do gateway.</p>",
    "isTest": true,
    "tags": [],
    "images": [
      "/images/logo-gold-grill.png"
    ],
    "compareAtPrice": 10
  }
];

function _slug(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export function getProductBySlug(slug: string): Product | undefined { return products.find((p) => p.slug === slug); }
// Listagens escondem produtos de teste (só aparecem na busca e por URL direta).
export function getProductsByCategory(category: string): Product[] { return products.filter((p) => !p.isTest && (p.category === category || _slug(p.category) === _slug(category))); }
export function getCollectionBySlug(slug: string): Collection | undefined { return collections.find((c) => c.slug === slug || _slug(c.name) === _slug(slug)); }
export function getProductsByCollection(slug: string): Product[] { const col = getCollectionBySlug(slug); return col ? products.filter((p) => !p.isTest && p.category === col.name) : products.filter((p) => !p.isTest); }
export interface VariantSibling { slug: string; label: string; isCurrent: boolean; }
export function getVariantSiblings(_slug: string): VariantSibling[] { return []; }
export interface SizeSibling { slug: string; label: string; isCurrent: boolean; }
export function getSizeSiblings(_slug: string): SizeSibling[] { return []; }
