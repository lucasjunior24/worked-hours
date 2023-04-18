import React from 'react';

import { 
    Text, 
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet
} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
	skill: string;
}

export function DiciplinaCard({ skill, ...rest } : SkillCardProps) {
  return (
    <TouchableOpacity 
      style={styles.buttonSkill}
      {...rest}
      >
      <Text style={styles.textSkill}>
          {skill}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10
  },
  textSkill: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});