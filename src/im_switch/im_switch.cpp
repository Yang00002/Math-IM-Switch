#include <Windows.h>
#include <stdlib.h>

int main(int argc, char* argv[])
{
	if (argc == 4)
	{
		int getPara = atoi(argv[1]);
		int setPara = atoi(argv[2]);
		int IMvalue = atoi(argv[3]);
		HWND hwnd = ImmGetDefaultIMEWnd(GetForegroundWindow());
		if (SendMessageW(hwnd, WM_IME_CONTROL, getPara, 0) != IMvalue)
		{
			SendMessageW(hwnd, WM_IME_CONTROL, setPara, IMvalue);
		}
	}
}
