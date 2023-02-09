import { getDefaultClient } from "connectkit";
import { createClient } from "wagmi";

import { optimism, optimismGoerli } from 'wagmi/chains';

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "vEVM Demo",
    alchemyId:  process.env.VITE_ALCHEMY_API_KEY,
	chains: [optimismGoerli, optimism],
  })
);
