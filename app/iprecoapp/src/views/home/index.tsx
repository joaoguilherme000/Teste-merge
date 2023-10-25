import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text,} from 'react-native';
import { Camera, useCameraDevice, } from 'react-native-vision-camera';

import Styles from './Style';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection} from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";

export default function Home () {
  const device = useCameraDevice('back')
  const camera = useRef<Camera | null>(null);
  const [imageData, setImageData] = useState<string>(''); // uri para mostrar a imagem

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission); // mostra qual permissao foi concedida
  };

  if (device == null) return(
    <View style={Styles.container}>
      <Text style={{fontSize: 20, color:'black'}}>Carregando Camera...</Text>
      <ActivityIndicator size={'large'}/>
    </View>

  );

  const tiraFoto = async () => {
    if (camera.current != null) {
      const photo = await camera.current.takePhoto(); // espera a camera tirar foto para colocar uma data nela
      const response = await fetch(`file://${photo.path}`);
      const blob = await response.blob();

      const storageRef = ref(storage, `images/`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Acompanhe o progresso do upload aqui, se necessário
        },
        (error) => {
          console.error('Erro no upload:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('URL da imagem:', downloadURL);

          try {
            const docRef = await addDoc(collection(db, 'imagens'), {
              url: downloadURL, // Salva a URL da imagem no Firestore
              createdAt: new Date().getTime(), // Adicione um carimbo de data/hora, se necessário
            });

            console.log('Documento salvo com sucesso', docRef.id);
          } catch (e) {
            console.error('Erro ao salvar no Firestore:', e);
          }

          setImageData(photo.path);
        }
      );
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column',gap: 5}}>
      <Camera
        ref={camera}
        style={Styles.camera}
        device={device}
        isActive={true}
        photo
      />
      <TouchableOpacity style={Styles.button} onPress={tiraFoto}>
        <Text style={{fontSize: 20, color:'black'}}>Tirar Foto</Text>
      </TouchableOpacity>
    </View>
  )
};
