import User from '../models/User';
import generateToken from '../utils/generateToken';
import { createTransportService } from '../utils/mail';

const registerUser = async (req: any, res: any) => {
  const { firstName, lastName, email, phone, password, isSeller } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    isSeller,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isSeller: user.isSeller,
      token: generateToken(user._id),
    });

    const transporter = createTransportService();
    await transporter.sendMail({
      to: user.email,
      subject: 'Welcome to Rentify',
      text: `Hello ${user.firstName}, welcome to Rentify!`,
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isSeller: user.isSeller,
      likedProperties: user.likedProperties,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getUserProfile = async (req: any, res: any) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isSeller: user.isSeller,
      likedProperties: user.likedProperties,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export { registerUser, loginUser, getUserProfile };
