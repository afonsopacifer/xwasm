function useWasm(fileName) {
  if (!('WebAssembly' in window)) {
    console.warn('you need a browser with wasm support enabled');
  }

  const memory = new WebAssembly.Memory({ initial: 256 });
  const importObj = {
      env: {
          abortStackOverflow: () => { throw new Error('overflow'); },
          table: new WebAssembly.Table({
            initial: 0, element: 'anyfunc'
          }),
          __table_base: 0,
          memory: memory,
          __memory_base: 1024,
          STACKTOP: 0,
          STACK_MAX: memory.buffer.byteLength,
      }
  };

  WebAssembly.instantiateStreaming(fetch(fileName), importObj)
    .then(results => {
      console.log(results.instance.exports._doubler(2))
    });
}

export default useWasm;
