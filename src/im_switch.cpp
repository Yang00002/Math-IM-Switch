#include <Windows.h>
#include <stdlib.h>

int main(int argc, char* argv[])
{
	if (argc == 3)
	{
		int getPara = atoi(argv[0]);
		int setPara = atoi(argv[0]);
		int IMvalue = atoi(argv[0]);
		HWND hwnd = ImmGetDefaultIMEWnd(GetForegroundWindow());
		if (SendMessageW(hwnd, WM_IME_CONTROL, getPara, 0) != IMvalue)
		{
			SendMessageW(hwnd, WM_IME_CONTROL, setPara, IMvalue);
		}
	}
}