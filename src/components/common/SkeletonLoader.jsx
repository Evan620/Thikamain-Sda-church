import React from 'react'
import './SkeletonLoader.css'

const SkeletonLoader = ({ 
  type = 'card', 
  count = 1, 
  height = '100px', 
  width = '100%',
  className = '' 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`skeleton-card ${className}`} style={{ height, width }}>
            <div className="skeleton-header">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-subtitle"></div>
            </div>
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-text"></div>
              <div className="skeleton-line skeleton-text short"></div>
            </div>
          </div>
        )
      
      case 'dashboard-card':
        return (
          <div className={`skeleton-dashboard-card ${className}`}>
            <div className="skeleton-card-icon"></div>
            <div className="skeleton-card-content">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-number"></div>
              <div className="skeleton-line skeleton-subtitle short"></div>
            </div>
          </div>
        )
      
      case 'table-row':
        return (
          <div className={`skeleton-table-row ${className}`}>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell short"></div>
          </div>
        )
      
      case 'chart':
        return (
          <div className={`skeleton-chart ${className}`} style={{ height, width }}>
            <div className="skeleton-chart-header">
              <div className="skeleton-line skeleton-title"></div>
              <div className="skeleton-line skeleton-subtitle short"></div>
            </div>
            <div className="skeleton-chart-content">
              <div className="skeleton-bars">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="skeleton-bar" 
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )
      
      case 'list':
        return (
          <div className={`skeleton-list ${className}`}>
            <div className="skeleton-list-header">
              <div className="skeleton-line skeleton-title"></div>
            </div>
            <div className="skeleton-list-items">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-list-item">
                  <div className="skeleton-avatar"></div>
                  <div className="skeleton-list-content">
                    <div className="skeleton-line skeleton-name"></div>
                    <div className="skeleton-line skeleton-detail short"></div>
                  </div>
                  <div className="skeleton-line skeleton-amount"></div>
                </div>
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <div className={`skeleton-line ${className}`} style={{ height, width }}></div>
        )
    }
  }

  return (
    <div className="skeleton-container">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-item">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
