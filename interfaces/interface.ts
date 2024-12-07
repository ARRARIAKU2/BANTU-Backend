import { Request, Response } from "express";

export interface Login {
  email?: string;
  password?: string;
}

export interface AuthModels {
  getLogin: (params: Login) => void;
}

export interface AuthServices {
  getLogin: (params: any) => void;
  generateToken: (data: IUser) => void;
  verifyToken: (token: string) => void;
}

export interface AuthControllers {
  getLogin: (req: Request, res: Response) => void;
}

export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}

export interface UserModels {
  getUsers: () => void;
  getUser: (id: string) => void;
  createUser: (data: IUser) => void;
  updateUser: (id: string, data: IUser) => void;
  deleteUser: (id: string) => void;
}

export interface UserServices {
  getUsers: () => void;
  getUser: (id: string) => void;
  createUser: (data: IUser) => void;
  updateUser: (id: string, data: IUser) => void;
  deleteUser: (id: string) => void;
}

export interface UserControllers {
  getUsers: (req: Request, res: Response) => void;
  getUser: (req: Request, res: Response) => void;
  getCurrentUser: (req: Request, res: Response) => void;
  createUser: (req: Request, res: Response) => void;
  updateUser: (req: Request, res: Response) => void;
  deleteUser: (req: Request, res: Response) => void;
}

export interface IServices {
  _id?: string;
  name?: string;
  category?: string;
  location?: string;
  rating?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}

export interface ServicesModels {
  getAllServices: (params: IServices) => void;
  getServices: (id: string) => void;
  createServices: (data: any) => void;
  updateServices: (id: string, data: any) => void;
  deleteServices: (id: string) => void;
}

export interface ServicesServices {
  getAllServices: (params: IServices) => void;
  getServices: (id: string) => void;
  createServices: (data: any) => void;
  updateServices: (id: string, data: any) => void;
  deleteServices: (id: string) => void;
}

export interface ServicesControllers {
  getAllServices: (req: Request, res: Response) => void;
  getServices: (req: Request, res: Response) => void;
  createServices: (req: Request, res: Response) => void;
  updateServices: (req: Request, res: Response) => void;
  deleteServices: (req: Request, res: Response) => void;
}

export interface IBookings {
  _id?: string;
  user_id?: string;
  service_id?: string;
  schedule?: string | Date;
  notes?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}

export interface BookingsModels {
  getBookings: () => void;
  getBooking: (id: string) => void;
  getBookingByUserId: (id: string) => void;
  createBookings: (data: IBookings) => void;
  updateBookings: (id: string, data: IBookings) => void;
  deleteBookings: (id: string) => void;
}

export interface BookingsServices {
  getBookings: () => void;
  getBooking: (id: string) => void;
  getBookingByUserId: (id: string) => void;
  createBookings: (data: IBookings) => void;
  updateBookings: (id: string, data: IBookings) => void;
  deleteBookings: (id: string) => void;
}

export interface BookingsControllers {
  getBookings: (req: Request, res: Response) => void;
  getBooking: (req: Request, res: Response) => void;
  getBookingByUserId: (req: Request, res: Response) => void;
  createBookings: (req: Request, res: Response) => void;
  updateBookings: (req: Request, res: Response) => void;
  deleteBookings: (req: Request, res: Response) => void;
}
