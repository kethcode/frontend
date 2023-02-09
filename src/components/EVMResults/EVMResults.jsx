import { useProvider, useContract } from "wagmi";
import { useEffect, useState } from "react";

import { ethers } from "ethers";

const evm_address = "0x4121E8574D28b2E5f5777F7B00d435Ee4886A5F4";

import evm_abi from "../../../abi/vEVM.json";

export function EVMResults(props) {
  const provider = useProvider();
  const evm = useContract({
    address: evm_address,
    abi: evm_abi.abi,
    signerOrProvider: provider,
  });

  const [results, setResults] = useState(null);

  //   console.log("  code:", state.code);
  //   console.log("    pc:", parseInt(state.pc));
  //   console.log("output:", state.output);
  //   console.log(" stack:", state.stack);
  //   console.log("   mem:", chunkSubstr(state.mem, 64));
  //   console.log("  skey:", state.storageKey);
  //   console.log(" sdata:", state.storageData);

  const renderResults = () => {
    if (results) {
      return (
        <div className="results">
          <h3>code</h3>
          <p>{results.code}</p>
          {/* <p>{results.pc}</p> */}
          <h3>result</h3>
          <p>{results.output}</p>
          <h3>stack</h3>
          <p>{results.stack}</p>
          {/* 
				<p>{results.mem}</p>
				<p>{results.storageKey}</p>
				<p>{results.storageData}</p> */}
        </div>
      );
    }
  };

  const executeBytecode = async () => {
    if (evm) {
      if (ethers.utils.isBytesLike(props.bytecode)) {
        const result = await evm.execute(props.bytecode);
        console.log(result);
        setResults(result);
      }
    }
  };

  useEffect(() => {
    if (props.bytecode) {
      executeBytecode();
    }
  });

  return <>{renderResults()}</>;
}
