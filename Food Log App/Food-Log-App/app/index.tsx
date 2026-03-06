import { Text, StyleSheet, ScrollView, Pressable, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomePage() {
  const router = useRouter();

  return (
    //Gradient Background
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="contain"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>The Food Log</Text>
      <Image
        source={require('@/assets/images/ourlogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
        <Pressable
          style={styles.button}
          onPress={() => router.push('/Login Page')}
        >
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Nunito'
  },

  button: {
    marginTop: 20,
    backgroundColor: '#636B2F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito'
  },

  logo: {
  width: 280,
  height: 280,
  marginVertical: 20,
},
});
