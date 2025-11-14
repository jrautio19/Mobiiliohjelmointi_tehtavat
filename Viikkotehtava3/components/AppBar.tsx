import React from 'react'
import { Appbar } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name)

  return (
    <Appbar.Header style={{ backgroundColor: '#edccd1ff' }}>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}

      <Appbar.Content title={title} />

      {!back && (
        <Appbar.Action
          icon="arrow-right"
          onPress={() => navigation.navigate('Second')}
        />
      )}
    </Appbar.Header>
  )
}

