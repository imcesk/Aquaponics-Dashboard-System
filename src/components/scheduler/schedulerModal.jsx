import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './SchedulerModal.css';

const SchedulerModal = ({ isOpen, onClose, action, scheduleType }) => {
  const [formData, setFormData] = useState({
    time: '08:00',
    duration: '15',
    status: 'ON'
  });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{action === 'add' ? 'Add New Schedule' : 'Edit Schedule'}</h3>
          <button className="btn-close" onClick={onClose}><MdClose size={20} /></button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Schedule Type</label>
            <input type="text" value={scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1)} disabled />
          </div>
          <div className="form-group">
            <label>Time (24h format)</label>
            <input 
              type="time" 
              value={formData.time} 
              onChange={(e) => setFormData({...formData, time: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Duration (Minutes)</label>
            <input 
              type="number" 
              value={formData.duration} 
              onChange={(e) => setFormData({...formData, duration: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label>Action</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="ON">Turn ON</option>
              <option value="OFF">Turn OFF</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save-modal" onClick={onClose}>
            {action === 'add' ? 'Save Schedule' : 'Update Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulerModal;