export default {
  port: process.env.PORT || 8080,
  dbUri:
    "mongodb+srv://schwobsi:4forGlesa@cluster0.zxwti.mongodb.net/express-tutorial?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  accessTokenTtl: "10m",
  refreshTokenTtl: "1y",
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdeqeDziSdPmkioVuN4wHNK9Xv
8YEx3rkhSMF8dX6+VbieQT0wjMoiBoGO7gUG9L/SZy5M5E1Gz85w5rLIrqnaTQ+z
v0XNLtjAGYNt8NyGTaDcdwVaOGvKNHxfd3RRZVTGsBgov0JJA//lKjIjyQtJMzEE
GOcgaMO1lmXtR5zO0wIDAQAB
-----END PUBLIC KEY-----`,

  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCdeqeDziSdPmkioVuN4wHNK9Xv8YEx3rkhSMF8dX6+VbieQT0w
jMoiBoGO7gUG9L/SZy5M5E1Gz85w5rLIrqnaTQ+zv0XNLtjAGYNt8NyGTaDcdwVa
OGvKNHxfd3RRZVTGsBgov0JJA//lKjIjyQtJMzEEGOcgaMO1lmXtR5zO0wIDAQAB
AoGAemdn5W9Jzl9AYQaCn1qff9Zex84z2YuA4nomypKZHWCLy5Zx9Va5lpDwCyS/
C5UZtHU269VYq33CvMbUmGAK7McTZ63RbrHeVEcgiwux/+sCilvM6hiRiSAzAMHB
+xgoRDKRNT/ONEyxi0jxdLpAobre3qDFx/jZ7kPJmgeMTSECQQDSoil8kpk4/tb0
9eReHhLSH9OTNQ6RVP8qkpeVNygFcO3HQyEHugG3+yA69t3hNIWeUvJkQEoUA1wq
9tM9BpXnAkEAv2WvuYSQRcrDV/MkeokplQV12fzFmsSwDZI2GYGBISeW65Q996P/
rcQKajZcGYtmwKq4jgNxmz1jgJUBT11KNQJAMydGxAYmR/073wnIiELtdzJbg6ii
/RCTV5d6ULawdYHTfU0EPIgj2raWQTuq7wJ+YNDsJQSn+OxH+fcvneZ3iQJACLJ0
M7fkXmeCTOLNi4vkCdN/sXIdAJVjcppsPuh1l64W24mW70PSgHDiEEV8FeURvDuF
u15IsUcu2E7tClAw6QJBAMXDH1RCsuS7KhYea+As+LuLGpbF7ewlqmRZ7BdoBOvq
7l0QXb46yQmTb2eiCjRLl61mVwA74otZTRZ3sJXnzjw=
-----END RSA PRIVATE KEY-----`,
};
