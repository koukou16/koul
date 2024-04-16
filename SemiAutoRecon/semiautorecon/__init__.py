# import random

# def sec_communication(input_data):
#     modulus = 256
#     multiplier = 203
#     alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
#     for offset in range(modulus):  # Boucle sur tous les offsets possibles
#         decrypted_message = ""
#         for character in input_data:
#             decrypted_character = None
#             for char_index in range(len(alphabet)):  # Boucle sur toutes les lettres de l'alphabet
#                 encrypted_character = (multiplier * ord(alphabet[char_index]) + offset) % modulus
#                 if encrypted_character == character:  # Vérifier si le caractère chiffré correspond
#                     decrypted_character = alphabet[char_index]
#                     break
# 	        print(decrypted_character)
#             if decrypted_character is not None:
#                 decrypted_message += decrypted_character
#             else:
#                 decrypted_message += "<UNKNOWN>"  # Ajouter <UNKNOWN> si aucun caractère correspondant n'est trouvé
                
#         if('Securinets' in decrypted_message):

#         	print(f"Offset: {offset}, Decrypted Message: {decrypted_message}")

# # Message chiffré fourni
# encrypted_message = [202, 16, 122, 192, 95, 60, 51, 16, 245, 42, 130, 149, 17, 106, 140, 78, 26, 132, 211, 149, 78, 17, 176, 132, 255, 78, 96, 202, 24]
# sec_communication(encrypted_message)
