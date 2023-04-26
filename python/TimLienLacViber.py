import pyautogui
import time
import pytesseract
from pytesseract import Output
import clipboard

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract\tesseract.exe'

# Nhập từ cần tìm kiếm
searchWord = input("Nhập số tiếp viên cần tìm kiếm: ")
shcb = input("Nhập số hiệu chuyến bay: ")

# Open Viber
pyautogui.press('win')
pyautogui.typewrite('Viber')
pyautogui.press('enter')

# Wait for Viber to open
time.sleep(2)

# Click on the search bar
pyautogui.click(x=118, y=47)

# Type the name of the chat you want to open
pyautogui.typewrite('Crew image')

# Wait for the search results to appear
time.sleep(1.5)

# Click on the chat you want to open
pyautogui.click(x=200, y=200)

# Wait for the chat to load
time.sleep(1)

# Tìm kiếm vị trí của icon Info
infoLocation = pyautogui.locateOnScreen('./info-icon.png', confidence=0.9)

if infoLocation:
# Nhấn click vào vị trí của icon Info
    x, y =  pyautogui.center(infoLocation)
    pyautogui.click(x, y)
    time.sleep(1)

# Click on the members button
pyautogui.click(x=1715, y=764)

while True:
    # Chụp ảnh màn hình
    startX = 1619
    startY = 67
    image = pyautogui.screenshot(region=(startX, startY, 300, 970))

    # Nhận dạng ký tự quang học (OCR)
    data = pytesseract.image_to_data(image, output_type=Output.DICT)

    # Tìm kiếm vị trí của từ cần tìm kiếm
    found = False
    for i in range(len(data['text'])):
        newWord = searchWord.lower()
        dataText = data['text'][i].lower()
        
        if i + 1 < len(data['text']):
            dataText2 = data['text'][i + 1].lower()

        dataTextCombine = dataText + dataText2

        if newWord in dataText or newWord == dataTextCombine or newWord in dataTextCombine:
            x = data['left'][i]
            y = data['top'][i]
            print(f"Đã tìm thấy từ '{searchWord, dataText, dataTextCombine}' tại tọa độ ({x}, {y})")

            pyautogui.click(startX + x, startY + y)

            # Đường dẫn đến icon message cần tìm kiếm
            image_path = './msg-icon.png'

            # Tìm kiếm vị trí của hình ảnh
            location = pyautogui.locateOnScreen(image_path, confidence=0.9)

            if location:
                # Nhấn click vào vị trí của hình ảnh
                x, y =  pyautogui.center(location)
                pyautogui.click(x, y)
                
                time.sleep(0.5)

                text = f'Em chào anh chị ạ. Em là Inflight DAD. SDT Hotline: 0868547922. Anh chị cần hỗ trợ cung ứng cbay QH{shcb} gì vậy ạ. Em cám ơn.'
                
                clipboard.copy(text)
                pyautogui.hotkey('ctrl', 'v')
                
                # Xóa từ tìm kiếm và trở về
                pyautogui.click(x=273, y=47)
                time.sleep(0.5)
                pyautogui.click(x=21, y=46)

                found = True
            else:
                print("Không tìm thấy hình ảnh")

            break

    if found:
        break

    # Cuộn xuống màn hình 2000 pixel
    pyautogui.scroll(-2000)
    time.sleep(0.5)