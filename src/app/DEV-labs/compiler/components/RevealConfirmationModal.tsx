import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

interface RevealConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userPoints: number;
  isRevealing?: boolean;
}

export function RevealConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  userPoints,
  isRevealing = false,
}: RevealConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="reveal-confirmation-modal">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
              <AlertTriangle className="text-amber-400 h-8 w-8" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-foreground">
                Reveal Test Case
              </DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground" data-testid="reveal-warning-message">
              Revealing this test case will deduct{' '}
              <span className="font-semibold text-amber-400">1 point</span> from your score. 
              Are you sure you want to continue?
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <i className="fas fa-info-circle text-amber-400"></i>
                <span className="text-muted-foreground">
                  You currently have{' '}
                  <span className="font-semibold text-foreground" data-testid="modal-current-points">
                    {userPoints} points
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isRevealing}
              data-testid="cancel-reveal-button"
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
              onClick={onConfirm}
              disabled={isRevealing || userPoints < 1}
              data-testid="confirm-reveal-button"
            >
              {isRevealing ? (
                <>
                  <div className="spinner mr-2" />
                  Revealing...
                </>
              ) : (
                'Reveal (-1 pt)'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
