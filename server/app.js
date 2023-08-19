import express from 'express'
import dotenv from 'dotenv'
import { transporter } from './nodemailer.js'
import cors from 'cors'

const app = express()
dotenv.config()

const corsOptions = {
    origin: ['https://portfolio-personal-kk5a.vercel.app', 'http://127.0.0.1:5500' ], 
    methods: 'POST', 
    allowedHeaders: ['Content-Type'], 
  };

//CORS
app.use(cors(corsOptions));


//Setting express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT

app.post('/send-email',(req,res)=>{
    const {name, email, address, number, message} = req.body
    console.log(req.body);
    console.log('Solicitud recibida en /send-email');
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: 'Nuevo mensaje de cliente de mi web site',
        html: `<p>Nombre: ${name}</p>
           <p>Email: ${email}</p>
           <p>Dirección: ${address}</p>
           <p>Teléfono: ${number}</p>
           <p>Mensaje: ${message}</p>`,
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.send('Error')
        }else{
            console.log('Email enviado:' + info.response);
            res.send('Exito')
        }
    })
})

app.listen(PORT,()=> {
    console.log(`Listening to the Port ${PORT}`);
})

