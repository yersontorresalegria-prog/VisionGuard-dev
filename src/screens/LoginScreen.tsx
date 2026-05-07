import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = { background: '#111827', card: '#1F2937', border: '#4B5563', cyan: '#00D4FF', text: '#FFFFFF', textSecondary: '#9CA3AF', secondary: '#3B82F6' };

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="shield-eye" size={52} color={COLORS.cyan} />
          </View>
          <Text style={styles.title}>VisionGuard</Text>
          <Text style={styles.subtitle}>Navegación IA para personas con discapacidad visual</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.textSecondary} style={{marginRight:12}} />
            <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor={COLORS.textSecondary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.textSecondary} style={{marginRight:12}} />
            <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor={COLORS.textSecondary} value={password} onChangeText={setPassword} secureTextEntry={!showPass} />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <MaterialCommunityIcons name={showPass ? 'eye-off' : 'eye'} size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => { if(!email||!password){Alert.alert('Error','Ingresa correo y contraseña');return;} onLogin(); }}>
            <Text style={styles.btnPrimaryText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => Alert.alert('Registro','Próximamente')}>
            <Text style={styles.btnSecondaryText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sosBtn} onPress={() => Alert.alert('SOS','Llamando a emergencias...')}>
          <MaterialCommunityIcons name="phone-alert" size={20} color="#FFF" />
          <Text style={styles.sosText}>BOTÓN SOS EMERGENCIA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:COLORS.background},
  inner:{flex:1,justifyContent:'center',paddingHorizontal:24,gap:16},
  header:{alignItems:'center',gap:8},
  logoCircle:{width:96,height:96,borderRadius:48,backgroundColor:COLORS.card,borderWidth:2,borderColor:COLORS.cyan,justifyContent:'center',alignItems:'center'},
  title:{fontSize:34,fontWeight:'800',color:COLORS.text},
  subtitle:{fontSize:13,color:COLORS.textSecondary,textAlign:'center'},
  form:{gap:14},
  inputRow:{flexDirection:'row',alignItems:'center',backgroundColor:COLORS.card,borderRadius:12,borderWidth:1,borderColor:COLORS.border,paddingHorizontal:16,height:56},
  input:{flex:1,color:COLORS.text,fontSize:16},
  btnPrimary:{backgroundColor:COLORS.cyan,borderRadius:12,height:56,justifyContent:'center',alignItems:'center'},
  btnPrimaryText:{color:'#000',fontSize:16,fontWeight:'700'},
  btnSecondary:{alignItems:'center',paddingVertical:12},
  btnSecondaryText:{color:COLORS.secondary,fontSize:14},
  sosBtn:{backgroundColor:'#DC2626',borderRadius:12,height:52,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:10},
  sosText:{color:'#FFF',fontWeight:'700',fontSize:14},
