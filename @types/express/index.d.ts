import express from 'express';
import { type User } from '../../types';

declare module 'express' {
    export interface Request {
        user?: User; 
        token?: string;
    }
}
