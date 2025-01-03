import { Router } from "express";
import UsersRepository from "../models/users/UsersRepository.js";

const usuariosRoutes = Router();
const usersList = new UsersRepository();

usuariosRoutes.get("/", (req, res) => {
    const usuarios = usersList.getAllUsers();
    return res.status(200).json({
        message: usuarios.length == 0 ? 
        "Não há usuários cadastrados" : 
        `Total de usuários cadastrados: ${usuarios.length}`,
        usuarios,
    })
});

usuariosRoutes.post("/", (req, res) => {
    const {name, email, password} = req.body;
    const user = usersList.addUser(name, email, password);
    return res.status(201).json({
        message: "Usuário foi cadastrado com sucesso!",
        user,
    })
})

usuariosRoutes.get("/:id", (req, res) => {
    const {id} = req.params;
    const user = usersList.getUserById(id);

    if (!user) {
        return res.status(404).json ({
            message:  `Usuário com ${id} não encontrado!`

        })
    }

    return res.status(200).json ({
        message:  `Usuário com ${id} encontrado!`,
        user,
    })
})

usuariosRoutes.put("/:id", (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;

    const user = usersList.updateUser(id, name, email, password);

    if (!user) {
        return res.status(404).json ({
            message:  `Usuário com ${id} não encontrado!`
        })
    }

    return res.status(200).json ({
        message:  `Usuário com ${id} foi atualizado com sucesso!`,
        user,
    })
})

usuariosRoutes.delete("/:id", (req, res) => {
    const {id} = req.params;
    const user = usersList.deleteUser(id);

    if (!user) {
        return res.status(404).json ({
            message:  `Usuário com ${id} não encontrado!`
        })
    }

    return res.status(200).json ({
        message:  `Usuário com ${id} foi deletado com sucesso!`,
        user,
    })
});

export default usuariosRoutes;

