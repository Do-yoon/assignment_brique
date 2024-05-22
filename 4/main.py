import tkinter as tk
from tkinter import ttk
import random
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib import font_manager, rc
import numpy as np
import os

class TemperatureHumidityApp:
    def __init__(self, root):
        self.root = root
        self.root.title("월별 평균 기온과 습도 그래프")

        self.months = [
            "1월", "2월", "3월", "4월", "5월", "6월",
            "7월", "8월", "9월", "10월", "11월", "12월"
        ]

        self.entries = []

        # 테이블 헤더
        header_frame = ttk.Frame(root)
        header_frame.grid(row=0, column=0, padx=10, pady=5)
        ttk.Label(header_frame, text="월").grid(row=0, column=0, padx=5, pady=5)
        ttk.Label(header_frame, text="평균 기온 (°C)").grid(row=0, column=1, padx=5, pady=5)
        ttk.Label(header_frame, text="평균 습도 (%)").grid(row=0, column=2, padx=5, pady=5)

        # 테이블 입력 필드
        for i, month in enumerate(self.months):
            row_frame = ttk.Frame(root)
            row_frame.grid(row=i+1, column=0, padx=10, pady=5)

            ttk.Label(row_frame, text=month).grid(row=0, column=0, padx=5, pady=5)
            temp_entry = ttk.Entry(row_frame, width=10)
            temp_entry.grid(row=0, column=1, padx=5, pady=5)
            humidity_entry = ttk.Entry(row_frame, width=10)
            humidity_entry.grid(row=0, column=2, padx=5, pady=5)

            self.entries.append((temp_entry, humidity_entry))

        self.random_button = ttk.Button(root, text="Random", command=self.generate_random_values)
        self.random_button.grid(row=len(self.months) + 1, column=0, pady=10)

        # 그래프를 표 오른쪽에 배치
        self.figure, self.ax1 = plt.subplots()
        self.ax2 = self.ax1.twinx()

        self.temp_line, = self.ax1.plot([], [], marker='o', color='b', linestyle='-', linewidth=1.5, label='기온')
        self.humidity_line, = self.ax2.plot([], [], marker='o', color='r', linestyle='-', linewidth=1.5, label='습도')

        self.ax1.set_xlabel('월')
        self.ax1.set_ylabel('기온 (°C)', color='b')
        self.ax2.set_ylabel('습도 (%)', color='r')
        self.ax1.set_title('월별 평균 기온과 습도')

        self.ax1.set_xlim(1, 12)  # 월 범위 설정
        self.ax1.set_ylim(-20, 40)  # 기온 범위 설정
        self.ax2.set_ylim(0, 100)  # 습도 범위 설정

        # 한글 폰트 설정
        font_path = "D2Coding-Ver1.3.2-20180524.ttf"  # 한글 폰트 파일 경로
        self.korean_font = font_manager.FontProperties(fname=font_path).get_name()
        rc('font', family=self.korean_font)
        plt.rcParams['axes.unicode_minus'] = False  # 마이너스 기호 처리

        # 범례 추가
        self.lines = [self.temp_line, self.humidity_line]
        self.labels = [line.get_label() for line in self.lines]
        self.ax1.legend(self.lines, self.labels, loc='upper left')

        self.figure.tight_layout()
        self.canvas = FigureCanvasTkAgg(self.figure, master=root)
        self.canvas.get_tk_widget().grid(row=0, column=1, rowspan=15, padx=10, pady=10)  # 그래프 위치 설정

        self.root.bind('<KeyRelease>', self.update_plot)

    def generate_random_values(self):
        for temp_entry, humidity_entry in self.entries:
            random_temp = round(random.uniform(-20, 40), 2)
            random_humidity = round(random.uniform(0, 100), 2)

            temp_entry.delete(0, 'end')
            temp_entry.insert(0, str(random_temp))

            humidity_entry.delete(0, 'end')
            humidity_entry.insert(0, str(random_humidity))

        self.update_plot()

    def update_plot(self, event=None):
        temperatures = []
        humidities = []
        for temp_entry, humidity_entry in self.entries:
            try:
                temperatures.append(float(temp_entry.get()))
                humidities.append(float(humidity_entry.get()))
            except ValueError:
                temperatures.append(0)
                humidities.append(0)

        self.temp_line.set_data(range(1, 13), temperatures)
        self.humidity_line.set_data(range(1, 13), humidities)

        self.ax1.relim()
        self.ax1.autoscale_view()
        self.ax2.relim()
        self.ax2.autoscale_view()

        self.canvas.draw()

def main():
    root = tk.Tk()
    app = TemperatureHumidityApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
