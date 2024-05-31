import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useListingDetailStore } from '../store'

export const BottomSheetCustom = () => {

    const idListing = useListingDetailStore(state => state.id);

    // memo
    const snapPoints = useMemo(() => [1,"50%"], []);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        console.log(idListing);
      if(idListing == null){
        bottomSheetRef.current?.close();
      }else{
        bottomSheetRef.current?.snapToIndex(1);
      }
    }, [idListing])
    

  return (
    <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
        </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });