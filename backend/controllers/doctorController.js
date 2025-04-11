import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const doctorLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const doctor = await doctorModel.findOne({ email })

    if (!doctor) {
      return res.json({ success: false, message: "Doctor does not exist" })
    }

    const isMatch = await bcrypt.compare(password, doctor.password)
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" })
    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: "7d" }
    )

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
    res.json({ success: true, message: 'Availablity Changed' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { doctorLogin, changeAvailablity, doctorList }
