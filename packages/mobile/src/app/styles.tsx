import {StyleSheet} from 'react-native'
import {colors} from './common/colors'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  rootButtonContainer: {
    width: '45%',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 30,
    width: 250,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 32,
  },
  cardBodyContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  cardButton: {
    backgroundColor: colors.accent,
    width: '45%',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  cardButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
})
