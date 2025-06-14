import bcrypt from "bcryptjs"
import { db } from "../libs/db.js";
import { UserRole } from "../libs/prisma/index.js";
import jwt from "jsonwebtoken";




export const register = async (req,res)=>{
    const {email,password,name,phone} = req.body;

  try {
     const existingUser = await db.user.findUnique({
        where:{
            email
        }
     })

     const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch){
        return res.status(401).json({
            error:"Invalid Credentials:...(password not matched)"
        })
     }


if(existingUser){
    return res.status(400).json({
        error:"User already exists 😒"
    })
}

const hashedPassword = await bcrypt.hash(password,10);

const newUser = await db.user.create({
    data:{
        email,
        password:hashedPassword,
        name,
        phone,
        role:UserRole.USER

    }
})

const token = jwt.sign({id:newUser.id}, process.env.JWT_SCRET,{
    expiresIn:"7d"
})
res.cookie("jwt",token, {
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_eENV !== "development",
    maxAge:1000*60*60*24*7

})
res.status(201).json({
    user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        phone:newUser.phone,
        image:newUser.image 
    },
    

})

  } catch (error) {
     console.error("error creting user:",error)
  }


}


export const login = async (req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(401).json({
                error : "User not found Login failed 😒"
            })
        }
        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(402).json({
                error:"Invalid credentials "
            })
        }

        const token = jwt.sign({id:newUser.id} , process.env.JWT_SCRET, {
            expiresIn:"7d"

    })
    res.cookie("jwt",token , {
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development",
        maxAge:1000*60*60*24*7

    })

     res.status(201).json({

            success:true,

            message:"User created successfully",

            user:{

                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image

            }

        })



    } catch (error) {
        console.error("error while login : ",error);
        res.status(500).json({
            error:"Error logging User"
        })
        
    }
}


export const logout= async (req,res)=>{
     try {
        res.clearCookie("jwt" , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
        })

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({
            error:"Error logging out user"
        })
    }
}


export const check=async(req,res)=>{
    
}
 