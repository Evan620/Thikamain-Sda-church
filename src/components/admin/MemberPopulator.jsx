import React, { useState } from 'react'
import { populateChurchMembers, checkExistingMembers, clearExistingMembers } from '../../utils/populateMembers'

const MemberPopulator = () => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [existingCount, setExistingCount] = useState(0)
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  // Check for existing members
  const handleCheckExisting = async () => {
    setLoading(true)
    setStatus('Checking for existing members...')
    
    try {
      const result = await checkExistingMembers()
      setExistingCount(result.count)
      
      if (result.count > 0) {
        setStatus(`Found ${result.count} existing members with TM-2025- prefix.`)
      } else {
        setStatus('No existing members found. Ready to populate.')
      }
    } catch (error) {
      setStatus(`Error checking existing members: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Populate members
  const handlePopulateMembers = async () => {
    setLoading(true)
    setStatus('Populating church members...')
    
    try {
      const result = await populateChurchMembers()
      
      if (result.success) {
        setStatus(`✅ ${result.message}`)
        setExistingCount(result.totalMembers)
      } else {
        setStatus(`❌ ${result.message}`)
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Clear existing members
  const handleClearMembers = async () => {
    setLoading(true)
    setStatus('Clearing existing members...')
    
    try {
      const result = await clearExistingMembers()
      
      if (result.success) {
        setStatus(`✅ Cleared ${result.cleared} existing members.`)
        setExistingCount(0)
      } else {
        setStatus(`❌ Error clearing members: ${result.error}`)
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
      setShowConfirmClear(false)
    }
  }

  return (
    <div className="member-populator-container">
      <div className="member-populator-card">
        <div className="member-populator-header">
          <h2>Church Members Population Tool</h2>
          <p>Populate the database with 299 church members from the official list.</p>
        </div>

        <div className="member-populator-content">
          {/* Status Display */}
          <div className="status-section">
            <h3>Status</h3>
            <div className="status-display">
              {status || 'Ready to begin...'}
            </div>
            {existingCount > 0 && (
              <div className="existing-count">
                <strong>Existing Members:</strong> {existingCount}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="actions-section">
            <h3>Actions</h3>
            <div className="action-buttons">
              <button
                onClick={handleCheckExisting}
                disabled={loading}
                className="btn-secondary"
              >
                {loading ? 'Checking...' : 'Check Existing Members'}
              </button>

              <button
                onClick={handlePopulateMembers}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Populating...' : 'Populate Members (299)'}
              </button>

              {existingCount > 0 && (
                <button
                  onClick={() => setShowConfirmClear(true)}
                  disabled={loading}
                  className="btn-danger"
                >
                  Clear Existing Members
                </button>
              )}
            </div>
          </div>

          {/* Member List Preview */}
          <div className="preview-section">
            <h3>Member List Preview</h3>
            <div className="member-preview">
              <p><strong>Total Members:</strong> 299</p>
              <p><strong>Sample Names:</strong></p>
              <ul className="sample-names">
                <li>Abel Omwenga Okindo (TM-2025-001)</li>
                <li>Abraham Sindani Sayah (TM-2025-002)</li>
                <li>Agnes Kerubo Nyabuto (TM-2025-003)</li>
                <li>... and 296 more members</li>
              </ul>
              <p><strong>Membership Number Format:</strong> TM-YYYY-XXX</p>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Processing...</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Clear */}
      {showConfirmClear && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>⚠️ Confirm Clear Members</h3>
            <p>
              Are you sure you want to clear all existing members with TM-2025- prefix?
              This action cannot be undone.
            </p>
            <p><strong>Members to be deleted:</strong> {existingCount}</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleClearMembers}
                className="btn-danger"
                disabled={loading}
              >
                {loading ? 'Clearing...' : 'Yes, Clear All'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .member-populator-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .member-populator-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .member-populator-header {
          background: linear-gradient(135deg, #2d5a27, #3a6b33);
          color: white;
          padding: 30px;
          text-align: center;
        }

        .member-populator-header h2 {
          margin: 0 0 10px 0;
          font-size: 24px;
          font-weight: 600;
        }

        .member-populator-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 16px;
        }

        .member-populator-content {
          padding: 30px;
          position: relative;
        }

        .status-section,
        .actions-section,
        .preview-section {
          margin-bottom: 30px;
        }

        .status-section h3,
        .actions-section h3,
        .preview-section h3 {
          margin: 0 0 15px 0;
          color: #2d5a27;
          font-size: 18px;
          font-weight: 600;
        }

        .status-display {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 15px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          min-height: 50px;
          white-space: pre-wrap;
        }

        .existing-count {
          margin-top: 10px;
          padding: 10px;
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          color: #856404;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary,
        .btn-danger {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 150px;
        }

        .btn-primary {
          background: #2d5a27;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #1e3d1a;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #545b62;
          transform: translateY(-1px);
        }

        .btn-danger {
          background: #dc3545;
          color: white;
        }

        .btn-danger:hover:not(:disabled) {
          background: #c82333;
          transform: translateY(-1px);
        }

        .btn-primary:disabled,
        .btn-secondary:disabled,
        .btn-danger:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .member-preview {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
        }

        .member-preview p {
          margin: 0 0 10px 0;
        }

        .sample-names {
          margin: 10px 0;
          padding-left: 20px;
        }

        .sample-names li {
          margin-bottom: 5px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #2d5a27;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .modal-content h3 {
          margin: 0 0 15px 0;
          color: #dc3545;
          font-size: 20px;
        }

        .modal-content p {
          margin: 0 0 15px 0;
          line-height: 1.5;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          margin-top: 25px;
        }

        @media (max-width: 768px) {
          .member-populator-container {
            padding: 10px;
          }

          .member-populator-header {
            padding: 20px;
          }

          .member-populator-content {
            padding: 20px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary,
          .btn-danger {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default MemberPopulator