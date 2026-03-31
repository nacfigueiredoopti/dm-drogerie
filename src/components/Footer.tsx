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
      {/* Feedback Section */}
      <View style={styles.feedbackSection}>
        <View style={styles.feedbackRow}>
          <Text style={styles.feedbackIcon}>❓</Text>
          <Text style={styles.feedbackTitle}>Wie gefällt Dir diese Seite?</Text>
          <View style={styles.feedbackEmojis}>
            <TouchableOpacity style={styles.emojiButton}><Text style={styles.emoji}>😊</Text></TouchableOpacity>
            <TouchableOpacity style={styles.emojiButton}><Text style={styles.emoji}>🙂</Text></TouchableOpacity>
            <TouchableOpacity style={styles.emojiButton}><Text style={styles.emoji}>😐</Text></TouchableOpacity>
            <TouchableOpacity style={styles.emojiButton}><Text style={styles.emoji}>😕</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Links Row */}
      <View style={styles.linksRow}>
        <TouchableOpacity><Text style={styles.linkBlue}>Unternehmen</Text></TouchableOpacity>
        <Text style={styles.linkSeparator}>|</Text>
        <TouchableOpacity><Text style={styles.linkBlue}>Jobs</Text></TouchableOpacity>
        <Text style={styles.linkSeparator}>|</Text>
        <TouchableOpacity><Text style={styles.linkBlue}>Services</Text></TouchableOpacity>
        <Text style={styles.linkSeparator}>|</Text>
        <TouchableOpacity><Text style={styles.linkBlue}>Kundenservice</Text></TouchableOpacity>
        <Text style={styles.linkSeparator}>|</Text>
        <TouchableOpacity><Text style={styles.linkBlue}>Geschäftskunden</Text></TouchableOpacity>
      </View>

      {/* Partners */}
      <View style={styles.partnersSection}>
        <Text style={styles.partnerHeader}>dm & Partner</Text>
        <View style={styles.partnerLogos}>
          <View style={styles.partnerTag}>
            <Text style={styles.partnerTagText}>glückskind</Text>
          </View>
          <View style={styles.partnerTag}>
            <Text style={styles.partnerTagText}>dmbusiness</Text>
          </View>
          <View style={styles.partnerTag}>
            <Text style={styles.partnerTagText}>dm ♥ med</Text>
          </View>
        </View>
      </View>

      {/* Security */}
      <View style={styles.securitySection}>
        <Text style={styles.partnerHeader}>Sicherheit & Datenschutz bei dm</Text>
        <View style={styles.securityBadges}>
          <View style={styles.securityBadge}>
            <Text style={styles.securityBadgeText}>EHI</Text>
          </View>
          <View style={styles.securityBadge}>
            <Text style={styles.securityBadgeText}>TÜV</Text>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.paymentSection}>
        <Text style={styles.partnerHeader}>Zahlungsarten bei dm</Text>
        <View style={styles.paymentMethods}>
          {['Klarna', 'PayPal', 'VISA', 'Mastercard', 'Apple Pay', 'Google Pay'].map((method) => (
            <View key={method} style={styles.paymentBadge}>
              <Text style={styles.paymentBadgeText}>{method}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Social */}
      <View style={styles.socialSection}>
        <Text style={styles.partnerHeader}>Mit dm verbinden</Text>
        <View style={styles.socialIcons}>
          {['📘', '📷', '💼', '▶️', '📌', '🎵', '💬'].map((icon, i) => (
            <TouchableOpacity key={i} style={styles.socialButton}>
              <Text style={styles.socialIcon}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* App Download */}
      <View style={styles.appSection}>
        <Text style={styles.partnerHeader}>Jetzt die dm-App herunterladen</Text>
        <View style={styles.appButtons}>
          <View style={styles.appStoreBadge}>
            <Text style={styles.appStoreText}>App Store</Text>
          </View>
          <View style={styles.appStoreBadge}>
            <Text style={styles.appStoreText}>Google Play</Text>
          </View>
        </View>
      </View>

      {/* Legal Links */}
      <View style={styles.legalSection}>
        <View style={styles.legalLinks}>
          {['Impressum', 'Datenschutz dm', 'Einwilligungsverwaltung', 'Nutzungsbedingungen', 'AGB dm'].map((link, i) => (
            <TouchableOpacity key={i}>
              <Text style={styles.legalLink}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* dm Logo Footer */}
      <View style={styles.logoSection}>
        <Text style={styles.footerLogo}>dm</Text>
        <Text style={styles.footerSlogan}>HIER BIN ICH MENSCH{'\n'}HIER KAUF ICH EIN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  feedbackSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  feedbackIcon: {
    fontSize: 20,
    backgroundColor: Colors.dmBlue,
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    overflow: 'hidden',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dmBlue,
    flex: 1,
  },
  feedbackEmojis: {
    flexDirection: 'row',
    gap: 8,
  },
  emojiButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    flexWrap: 'wrap',
    gap: 4,
  },
  linkBlue: {
    fontSize: 13,
    color: Colors.dmBlue,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  linkSeparator: {
    fontSize: 13,
    color: Colors.textLight,
    marginHorizontal: 4,
  },
  partnersSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  partnerHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dmBlue,
    marginBottom: 12,
  },
  partnerLogos: {
    flexDirection: 'row',
    gap: 16,
  },
  partnerTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  partnerTagText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dmBlue,
  },
  securitySection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  securityBadges: {
    flexDirection: 'row',
    gap: 12,
  },
  securityBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.dmBlue,
  },
  paymentSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paymentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 4,
  },
  paymentBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  socialSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dmBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
  },
  appSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  appButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  appStoreBadge: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  appStoreText: {
    color: Colors.textWhite,
    fontSize: 13,
    fontWeight: '600',
  },
  legalSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  legalLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  legalLink: {
    fontSize: 12,
    color: Colors.dmBlue,
    textDecorationLine: 'underline',
    marginRight: 8,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerLogo: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.primary,
    fontStyle: 'italic',
    letterSpacing: -3,
    marginBottom: 4,
  },
  footerSlogan: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.dmBlue,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    lineHeight: 14,
  },
});

export default Footer;
