import { useProvider, useContract } from "wagmi";
import { useEffect, useState, useMemo } from "react";

import { ethers } from "ethers";

const evm_address = "0x4121E8574D28b2E5f5777F7B00d435Ee4886A5F4";

import evm_abi from "../../../abi/vEVM.json";

type vEVMState = {
  code: string;
  pc: string;
  output: string;
  stack: string;
  mem: string;
  storageKey: string;
  storageData: string;
};

export function EVMResults(props: any) {
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
      const res: vEVMState = results;

      return (
        <div className="results">
          <h2>results</h2>
          <div className="container-terminal">
            <h3>code</h3>
            <p>{res.code}</p>
            {/* <p>{results.pc}</p> */}
            <h3>output</h3>
            <p>{res.output}</p>
            <h3>stack</h3>
            <p>{res.stack}</p>
            {/* 
           <p>{results.mem}</p>
           <p>{results.storageKey}</p>
           <p>{results.storageData}</p> */}
          </div>
        </div>
      );
    }
  };

  const executeBytecode = async () => {
    if (evm) {
      if (props.bytecode != "") {
        let code = props.bytecode;
        if (code.substring(0, 2) != "0x") {
          code = "0x" + code;
        }

        if (ethers.utils.isBytesLike(code)) {
          const result = await evm.execute(code);
          console.log(result);
          setResults(result);
        }
      }
    }
  };

  const result = useMemo(() => executeBytecode(), [props.bytecode]);

  return <>{renderResults()}</>;
}
