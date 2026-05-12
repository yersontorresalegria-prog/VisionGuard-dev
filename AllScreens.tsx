import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = { background: '#111827', card: '#1F2937', border: '#4B5563', cyan: '#00D4FF', text: '#FFFFFF', textSecondary: '#9CA3AF', secondary: '#3B82F6', success: '#10B981', danger: '#EF4444', warning: '#F59E0B' };

export function NavigationScreen() {
  const [active, setActive] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.mapBox}>
          <MaterialCommunityIcons name="map" size={64} color={COLORS.cyan} />
          <Text style={styles.mapText}>Mapa Interactivo</Text>
          <Text style={styles.mapSub}>GPS en tiempo real</Text>
        </View>
        <TouchableOpacity style={[styles.navBtn,active&&{backgroundColor:COLORS.danger}]} onPress={()=>setActive(!active)}>
          <MaterialCommunityIcons name={active?'stop-circle':'navigation'} size={28} color="#FFF" />
          <Text style={styles.navBtnText}>{active?'DETENER':'INICIAR NAVEGACIÓN IA'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export function ThreatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card,{borderColor:COLORS.success,borderWidth:1}]}>
          <View style={{flexDirection:'row',alignItems:'center',gap:12}}>
            <MaterialCommunityIcons name="shield-check" size={32} color={COLORS.success} />
            <View>
              <Text style={styles.cardTitle}>Estado actual</Text>
              <Text style={{color:COLORS.success,fontWeight:'700'}}>ENTORNO SEGURO</Text>
            </View>
          </View>
        </View>
        {[{icon:'car',label:'Vehículo en movimiento',level:'Alto',color:COLORS.danger,time:'Hace 2 min'},{icon:'stairs',label:'Escaleras detectadas',level:'Medio',color:COLORS.warning,time:'Hace 5 min'},{icon:'road',label:'Cruce peatonal',level:'Info',color:COLORS.cyan,time:'Hace 8 min'}].map((t,i)=>(
          <View key={i} style={[styles.threatCard,{borderLeftColor:t.color}]}>
            <MaterialCommunityIcons name={t.icon as any} size={28} color={t.color} />
            <View style={{flex:1}}>
              <Text style={styles.threatLabel}>{t.label}</Text>
              <Text style={styles.threatTime}>{t.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function PaymentScreen() {
  const plans = [
    {name:'BÁSICO',price:'$4.99',features:['Navegación básica','5 destinos/día'],color:COLORS.secondary},
    {name:'PRO',price:'$12.99',features:['IA avanzada 24/7','Destinos ilimitados'],color:COLORS.cyan},
    {name:'FAMILIA',price:'$24.99',features:['Hasta 4 usuarios','Todo en PRO'],color:'#8B5CF6'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.pageTitle}>Elige tu plan</Text>
        {plans.map((plan,i)=>(
          <View key={i} style={[styles.planCard,{borderColor:plan.color}]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <Text style={[styles.planName,{color:plan.color}]}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}<Text style={styles.planPeriod}>/mes</Text></Text>
            </View>
            {plan.features.map((f,j)=>(
              <View key={j} style={{flexDirection:'row',alignItems:'center',gap:8}}>
                <MaterialCommunityIcons name="check-circle" size={16} color={plan.color} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
            <TouchableOpacity style={[styles.planBtn,{backgroundColor:plan.color}]} onPress={()=>Alert.alert('Suscripción',`Procesando plan ${plan.name}...`)}>
              <Text style={styles.planBtnText}>Suscribirme</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={52} color={COLORS.cyan} />
          </View>
          <Text style={styles.profileName}>Usuario VisionGuard</Text>
          <Text style={styles.profilePlan}>Plan PRO</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={()=>Alert.alert('Cerrar sesión','¿Estás seguro?')}>
          <MaterialCommunityIcons name="logout" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:COLORS.background},
  scroll:{padding:20,gap:16},
  card:{backgroundColor:COLORS.card,borderRadius:16,padding:20,borderWidth:1,borderColor:COLORS.border},
  cardTitle:{color:COLORS.text,fontSize:16,fontWeight:'700',marginBottom:4},
  mapBox:{backgroundColor:COLORS.card,borderRadius:20,height:180,justifyContent:'center',alignItems:'center',gap:8,borderWidth:1,borderColor:COLORS.border},
  mapText:{color:COLORS.text,fontSize:18,fontWeight:'700'},
  mapSub:{color:COLORS.textSecondary,fontSize:13},
  navBtn:{backgroundColor:COLORS.cyan,borderRadius:16,padding:20,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:12},
  navBtnText:{color:'#000',fontWeight:'800',fontSize:15},
  threatCard:{backgroundColor:COLORS.card,borderRadius:12,padding:16,flexDirection:'row',alignItems:'center',gap:14,borderLeftWidth:4,borderWidth:1,borderColor:COLORS.border},
  threatLabel:{color:COLORS.text,fontSize:14,fontWeight:'600'},
  threatTime:{color:COLORS.textSecondary,fontSize:12,marginTop:2},
  pageTitle:{color:COLORS.text,fontSize:26,fontWeight:'800',textAlign:'center'},
  planCard:{backgroundColor:COLORS.card,borderRadius:20,padding:24,gap:12,borderWidth:2},
  planName:{fontSize:20,fontWeight:'800'},
  planPrice:{color:COLORS.text,fontSize:28,fontWeight:'800'},
  planPeriod:{fontSize:14,color:COLORS.textSecondary,fontWeight:'400'},
  featureText:{color:COLORS.textSecondary,fontSize:14},
  planBtn:{borderRadius:12,padding:16,alignItems:'center',marginTop:8},
  planBtnText:{color:'#000',fontWeight:'800',fontSize:15},
  profileHeader:{alignItems:'center',gap:8,paddingVertical:20},
  avatar:{width:96,height:96,borderRadius:48,backgroundColor:COLORS.card,borderWidth:2,borderColor:COLORS.cyan,justifyContent:'center',alignItems:'center'},
  profileName:{color:COLORS.text,fontSize:22,fontWeight:'700'},
  profilePlan:{color:COLORS.cyan,fontSize:15,fontWeight:'600'},
  logoutBtn:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,padding:16,borderRadius:12,borderWidth:1,borderColor:COLORS.danger},
  logoutText:{color:COLORS.danger,fontSize:16,fontWeight:'700'},
});
