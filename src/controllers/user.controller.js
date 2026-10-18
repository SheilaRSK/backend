import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if (password.length < 6 || password.length > 50) {
            return res.status(400).json({ message: "La contraseña debe tener entre 6 y 50 caracteres" });
        }

        const existing = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        });
        if (existing) {
            return res.status(409).json({ message: "El usuario o el correo ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            loggedIn: false,
        });

        res.status(201).json({
            message: "Usuario registrado",
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

export { registerUser };