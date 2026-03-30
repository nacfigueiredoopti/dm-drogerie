import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Services */}
      <View style={styles.servicesRow}>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>🚚</Text>
          <Text style={styles.serviceText}>Kostenloser{'\n'}Versand ab 49 €</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>🏪</Text>
          <Text style={styles.serviceText}>Filialabholung{'\n'}verfügbar</Text>
        </View>
        <View style={styles.serviceItem}>
          <Text style={styles.serviceIcon}>↩️</Text>
          <Text style={styles.serviceText}>30 Tage{'\n'}Rückgaberecht</Text>
        </View>
      </View>

      {/* Links */}
      <View style={styles.linksContainer}>
        <View style={styles.linkColumn}>
          <Text style={styles.linkHeader}>Kundenservice</Text>
          <TouchableOpacity><Text style={styles.link}>Hilfe & Kontakt</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link}>Lieferung & Versand</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link}>Rücksendung</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link}>Zahlungsarten</Text></TouchableOpacity>
        </View>
        <View style={styles.linkColumn}>
          <Text style={styles.linkHeader}>Unternehmen</Text>
          <TouchableOpacity><Text style={styles.link}>Über dm</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link}>Karriere</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link}>Nachhaltigkeit</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.link}>Presse</Text></TouchableOpacity>
        </View>
      </View>

      {/* Social */}
      <View style={styles.socialRow}>
        <Text style={styles.socialLabel}>Folgen Sie uns:</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>📘</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>📷</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>🎵</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>▶️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        <Text style={styles.copyright}>
          © 2024 dm-drogerie markt GmbH + Co. KG
        </Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity>
            <Text style={styles.legalLink}>Impressum</Text>
          </TouchableOpacity>
          <Text style={styles.legalSeparator}>|</Text>
          <TouchableOpacity>
            <Text style={styles.legalLink}>Datenschutz</Text>
          </TouchableOpacity>
          <Text style={styles.legalSeparator}>|</Text>
          <TouchableOpacity>
            <Text style={styles.legalLink}>AGB</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D2D',
    paddingTop: 24,
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  serviceText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 32,
  },
  linkColumn: {
    flex: 1,
  },
  linkHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textWhite,
    marginBottom: 12,
  },
  link: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  socialLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 18,
  },
  bottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalLink: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  legalSeparator: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
  },
});

export default Footer;
