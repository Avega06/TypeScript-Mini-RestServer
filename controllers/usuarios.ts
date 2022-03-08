import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios =  async (req: Request , res: Response ) =>{

    const usuarios = await Usuario.findAll();

    res.json({usuarios});

}

export const getUsuario = async ( req: Request , res: Response ) =>{

    const { id } = req.params;
    
    const usuarios = await Usuario.findByPk(id);

    if (!usuarios) {
        res.status(404).json({
            msg: `Don't exist user by ${id}`
        });
    }
    res.json({
        usuarios,
    })

}

export const postUsuario = async( req: Request , res: Response ) =>{

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email,
            }
        });
        
        if (existeEmail) {
            return res.status(400).json({
                msg: `Email already exists ${body.email}`,
            })
        }
        
        const usuario = Usuario.build(body);
        await usuario.save();

        res.json( usuario );


    } catch (error: any) {

        console.log(error);
        res.status(500).json({
            msg : 'Contact with Admin',
        })
    }



}

export const putUsuario = async( req: Request , res: Response ) =>{

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'Dont exist user by id: '+id, 
            })
        }

        await usuario.update( body );

        res.json(usuario);

    } catch (error: any) {

        console.log(error);
        res.status(500).json({
            msg : 'Contact with Admin',
        })
    }

}

export const deleteUsuario = async( req: Request , res: Response ) =>{

    const { id } = req.params;
    
    const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg: 'Dont exist user by id: '+id, 
            })
        }

    await usuario.update({
        estado: false,
    })


    res.json({
       usuario
    })

}