import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
  onHome?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in BrandNewDay component:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('brand-new-day-session');
    } catch (e) {
      console.error(e);
    }
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF0F2] flex items-center justify-center p-6 text-[#4A1F1F] font-sans">
          <div className="max-w-md w-full bg-white border border-[#FADADD] rounded-3xl p-8 shadow-xl text-center space-y-5">
            <span className="text-[11px] font-bold tracking-widest text-[#C06C84] uppercase bg-[#FFF0F2] border border-[#FADADD] px-3.5 py-1 rounded-full inline-block">
              Brand New Day
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#4A1F1F]">
              Terjadi Kesalahan Tampilan
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sesi sebelumnya mungkin memiliki data yang tidak sesuai. Tekan tombol di bawah untuk menyegarkan dan memulai ulang sesi.
            </p>

            <div className="pt-3 space-y-2.5">
              <button
                onClick={this.handleReset}
                className="w-full py-3.5 bg-[#4A1F1F] text-white font-bold rounded-2xl shadow-md hover:bg-[#7A2E2E] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Sesi & Muat Ulang</span>
              </button>

              {this.props.onHome && (
                <button
                  onClick={this.props.onHome}
                  className="w-full py-3 bg-[#FAF9F6] border border-gray-200 text-[#4A1F1F] font-bold rounded-2xl hover:bg-gray-100 transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Kembali ke Website PMK Agape</span>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
