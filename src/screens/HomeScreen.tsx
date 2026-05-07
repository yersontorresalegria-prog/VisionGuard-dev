import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Vibration } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = { background: '#111827', card: '#1F2937', border: '#4B5563', cyan: '#00D4FF', text: '#FFFFFF', textSecondary: '#9CA3AF', success: '#10B981', warning: '#F59E0B' };

export function HomeScreen() {
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState('Listo para escanear');

  const startScan = () => {
    setScanning(true);
    setStatus('Analizando entorno...');
    Vibration.vibrate(200);
    setTimeout(() => {
      setScanning(false);
      setStatus('Entorno seguro detectado');
      Alert.alert('Análisis Completo','No se detectaron obstáculos.');
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statusCard}>
          <View style={[styles.dot,{backgroundColor:scanning?COLORS.warning:COLORS.success}]} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <TouchableOpacity style={[styles.scanBtn,scanning&&{borderColor:COLORS.warning}]} onPress={startScan} disabled={scanning}>
          <MaterialCommunityIcons name={scanning?'radar':'eye-scan'} size={64} color={scanning?COLORS.warning:COLORS.cyan} />
          <Text style={styles.scanLabel}>{scanning?'Escaneando...':'ESCANEAR ENTORNO'}</Text>
          <Text style={styles.scanSub}>Toca para analizar con IA</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.grid}>
          {[{icon:'map-marker-radius',label:'Navegar',color:COLORS.cyan},{icon:'account-voice',label:'Voz IA',color:'#8B5CF6'},{icon:'bell-alert',label:'Alertas',color:COLORS.warning},{icon:'contacts',label:'Contactos',color:COLORS.success}].map((item,i)=>(
            <TouchableOpacity key={i} style={styles.gridItem} onPress={()=>Alert.alert(item.label,`${item.label} activado`)}>
              <MaterialCommunityIcons name={item.icon as any} size={32} color={item.color} />
              <Text style={styles.gridLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.sosBtn} onPress={()=>{Vibration.vibrate([0,500,200,500]);Alert.alert('SOS ACTIVADO','Contactando emergencias...');}}>
          <MaterialCommunityIcons name="phone-alert" size={28} color="#FFF" />
          <Text style={styles.sosText}>BOTÓN DE EMERGENCIA SOS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:COLORS.background},
  scroll:{padding:20,gap:20},
  statusCard:{flexDirection:'row',alignItems:'center',backgroundColor:COLORS.card,borderRadius:12,padding:16,gap:12,borderWidth:1,borderColor:COLORS.border},
  dot:{width:12,height:12,borderRadius:6},
  statusText:{color:COLORS.text,fontSize:15,fontWeight:'600'},
  scanBtn:{backgroundColor:COLORS.card,borderRadius:20,padding:40,alignItems:'center',gap:12,borderWidth:2,borderColor:COLORS.cyan},
  scanLabel:{color:COLORS.text,fontSize:20,fontWeight:'800'},
  scanSub:{color:COLORS.textSecondary,fontSize:13},
  sectionTitle:{color:COLORS.text,fontSize:18,fontWeight:'700'},
  grid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  gridItem:{flex:1,minWidth:'45%',backgroundColor:COLORS.card,borderRadius:16,padding:20,alignItems:'center',gap:8,borderWidth:1,borderColor:COLORS.border},
  gridLabel:{color:COLORS.text,fontSize:14,fontWeight:'600'},
  sosBtn:{backgroundColor:'#DC2626',borderRadius:16,padding:20,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:12},
  sosText:{color:'#FFF',fontWeight:'800',fontSize:16},
});
