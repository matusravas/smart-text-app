import { useRef, useEffect, DependencyList, EffectCallback } from 'react'

export const useMountedEffect = (callback: EffectCallback, dependencies: DependencyList | undefined) => {
    const isMounted = useRef(false)

    useEffect(() => {
        if (isMounted.current) {
            return callback();
        }
        isMounted.current = true;
        // return ()=>{
        //     console.log('unmount')
        //     isMounted.current = false
        // }
    }, [dependencies])
}