import { createContext } from "react";
import { ContextProps } from "../@types";

const BetweenContext = createContext<ContextProps | null>(null);

export default BetweenContext;
